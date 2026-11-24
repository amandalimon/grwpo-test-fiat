import type { Option } from '@/content/types'
import { fillTemplate } from '@/lib/fill-template'
import type { QuoteFormValues } from './schema'
import type { QuoteFormContent } from './types'

export type QuoteConfirmation = {
  title: string
  details: string[]
  contact: string
}

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

const labelOf = (options: readonly Option[], value: string) =>
  options.find(option => option.value === value)?.label ?? value

export function toConfirmation(
  values: QuoteFormValues,
  content: QuoteFormContent,
): QuoteConfirmation {
  const { vehicle, personalData, payment, submission } = content
  const copy = submission.confirmation

  const method = labelOf(payment.method.options, values.paymentMethod)
  const paymentPlan =
    values.paymentMethod === 'credit'
      ? fillTemplate(copy.credit, {
          method,
          term: labelOf(payment.term.options, values.term),
        })
      : method
  const downPayment = fillTemplate(copy.downPayment, {
    amount: currency.format(values.downPayment / 100),
  })

  return {
    title: fillTemplate(copy.title, { name: values.firstName }),
    details: [
      `${labelOf(vehicle.model.options, values.model)} · ${labelOf(vehicle.version.options, values.version)}`,
      paymentPlan,
      downPayment,
      labelOf(vehicle.dealer.options, values.dealer),
    ],
    contact:
      copy.contact[values.contactMethod] ??
      labelOf(personalData.contactMethod.options, values.contactMethod),
  }
}
