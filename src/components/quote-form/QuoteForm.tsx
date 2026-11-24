import type { QuoteFormContent } from '@/content/types'
import { ui } from '@/content/ui'
import { CommentsSection } from './CommentsSection'
import { FormFooter } from './FormFooter'
import { PaymentSection } from './PaymentSection'
import { PersonalDataSection } from './PersonalDataSection'
import { VehicleFields } from './VehicleFields'

type QuoteFormProps = {
  content: Omit<QuoteFormContent, 'hero'>
}

export function QuoteForm({ content }: QuoteFormProps) {
  return (
    <form
      aria-label={ui.quoteForm}
      className="relative mx-auto max-w-994 bg-white px-15 pt-60 pb-50"
    >
      <VehicleFields content={content.vehicle} />
      <PersonalDataSection content={content.personalData} />
      <PaymentSection content={content.payment} />
      <CommentsSection content={content.comments} />
      <FormFooter content={content.consents} />
    </form>
  )
}
