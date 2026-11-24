'use server'

import { getQuoteFormContent } from './content'
import {
  createQuoteSchema,
  parseQuote,
  toQuoteErrors,
  type QuoteErrors,
} from './schema'

export type QuoteFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; errors: QuoteErrors }

export async function submitQuote(
  _previousState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const schema = createQuoteSchema(await getQuoteFormContent())
  const result = parseQuote(schema, formData)

  if (!result.success) {
    return { status: 'error', errors: toQuoteErrors(result.error) }
  }

  return { status: 'success' }
}
