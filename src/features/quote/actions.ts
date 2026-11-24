'use server'

import { toConfirmation, type QuoteConfirmation } from './confirmation'
import { getQuoteFormContent } from './content'
import {
  createQuoteSchema,
  parseQuote,
  toQuoteErrors,
  type QuoteErrors,
} from './schema'

export type QuoteFormState =
  | { status: 'idle' }
  | { status: 'success'; confirmation: QuoteConfirmation }
  | { status: 'error'; errors: QuoteErrors }

export async function submitQuote(
  _previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const content = await getQuoteFormContent()
  const result = parseQuote(createQuoteSchema(content), formData)

  if (!result.success) {
    return { status: 'error', errors: toQuoteErrors(result.error) }
  }

  return {
    status: 'success',
    confirmation: toConfirmation(result.data, content),
  }
}
