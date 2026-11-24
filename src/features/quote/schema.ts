import { z } from 'zod'
import type { Option } from '@/content/types'
import { ui } from '@/content/ui'
import type { QuoteFormContent } from './types'

const messages = ui.validation

const phoneCharacters = /^\+?[\d\s.()-]+$/
const mexicanNationalNumber = /^[1-9]\d{9}$/
const namePattern = /^\p{L}[\p{L}\p{M}' ’.-]*$/u
const amountPattern = /^\$?(\d{1,3}(,\d{3})+|\d+)(\.\d{1,2})?$/
const maxDownPaymentCents = 10_000_000 * 100

export const fieldLimits = {
  name: 50,
  email: 254,
  phone: 25,
  downPayment: 20,
  comments: 500,
}

const normalizeName = (value: string) =>
  value.normalize('NFC').replace(/\s+/g, ' ')

const toCents = (value: string) => {
  const [whole, fraction = ''] = value.replace(/[$,]/g, '').split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'))
}

const toNationalNumber = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (value.startsWith('+') && !digits.startsWith('52')) return ''
  if (digits.length === 13 && digits.startsWith('521')) return digits.slice(3)
  if (digits.length === 12 && digits.startsWith('52')) return digits.slice(2)
  return digits
}

const oneOf = (options: readonly Option[]) =>
  z.enum(options.map(option => option.value) as [string, ...string[]], {
    error: issue =>
      issue.input === undefined || issue.input === ''
        ? messages.required
        : messages.invalidOption,
  })

const requiredText = (maxLength: number) =>
  z
    .string({ error: messages.required })
    .trim()
    .min(1, messages.required)
    .max(maxLength, messages.tooLong)

const optionalText = (maxLength: number) =>
  z.string().trim().max(maxLength, messages.tooLong).default('')

const requiredName = requiredText(fieldLimits.name)
  .overwrite(normalizeName)
  .regex(namePattern, messages.name)

const optionalName = z
  .string()
  .trim()
  .overwrite(normalizeName)
  .max(fieldLimits.name, messages.tooLong)
  .refine(value => !value || namePattern.test(value), messages.name)
  .default('')

const mexicanPhone = requiredText(fieldLimits.phone)
  .regex(phoneCharacters, messages.phone)
  .transform(toNationalNumber)
  .refine(value => mexicanNationalNumber.test(value), messages.phone)
  .transform(value => `+52${value}`)

export type QuoteSchemaContent = Pick<
  QuoteFormContent,
  'vehicle' | 'personalData' | 'payment'
>

export function createQuoteSchema(content: QuoteSchemaContent) {
  const { vehicle, personalData, payment } = content

  return z.object({
    model: oneOf(vehicle.model.options),
    version: oneOf(vehicle.version.options),
    state: oneOf(vehicle.state.options),
    dealer: oneOf(vehicle.dealer.options),
    firstName: requiredName,
    lastName: requiredName,
    secondLastName: optionalName,
    email: requiredText(fieldLimits.email)
      .toLowerCase()
      .pipe(z.email(messages.email)),
    phone: mexicanPhone,
    contactMethod: oneOf(personalData.contactMethod.options),
    paymentMethod: oneOf(payment.method.options),
    downPayment: requiredText(fieldLimits.downPayment)
      .regex(amountPattern, messages.amount)
      .transform(toCents)
      .refine(
        cents =>
          Number.isSafeInteger(cents) &&
          cents > 0 &&
          cents <= maxDownPaymentCents,
        messages.amountRange,
      ),
    term: oneOf(payment.term.options),
    comments: optionalText(fieldLimits.comments),
    acceptPrivacyNotice: z.literal('on', { error: messages.required }),
    optOutOfPromotions: z
      .literal('on')
      .optional()
      .transform(value => value === 'on'),
  })
}

export type QuoteSchema = ReturnType<typeof createQuoteSchema>

export type QuoteFormValues = z.output<QuoteSchema>

export type QuoteFieldErrors = Partial<Record<keyof QuoteFormValues, string>>

export type QuoteErrors = {
  form?: string
  fields: QuoteFieldErrors
}

export function parseQuote(schema: QuoteSchema, formData: FormData) {
  return schema.safeParse(Object.fromEntries(formData))
}

export function toQuoteErrors(error: z.ZodError<QuoteFormValues>): QuoteErrors {
  const { formErrors, fieldErrors } = z.flattenError(error)
  return {
    form: formErrors[0],
    fields: Object.fromEntries(
      Object.entries(fieldErrors).map(([name, issues]) => [name, issues?.[0]]),
    ),
  }
}
