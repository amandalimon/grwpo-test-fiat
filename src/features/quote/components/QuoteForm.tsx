import { ui } from '@/content/ui'
import type { QuoteFormContent } from '../types'
import { CommentsSection } from './CommentsSection'
import { FormFooter } from './FormFooter'
import { PaymentSection } from './PaymentSection'
import { PersonalDataSection } from './PersonalDataSection'
import { QuoteFormShell } from './QuoteFormShell'
import { VehicleFields } from './VehicleFields'

type QuoteFormProps = {
  content: Omit<QuoteFormContent, 'hero'>
}

export function QuoteForm({ content }: QuoteFormProps) {
  return (
    <QuoteFormShell
      label={ui.quoteForm}
      messages={content.submission}
      schemaContent={{
        vehicle: content.vehicle,
        personalData: content.personalData,
        payment: content.payment,
      }}
      className="relative mx-auto max-w-994 bg-white px-15 pt-60 pb-50 md:mx-15 md:px-64 md:pt-68 md:pb-100 lg:mx-auto lg:px-85 lg:pt-154 lg:pr-86 lg:pb-93"
    >
      <VehicleFields content={content.vehicle} />
      <PersonalDataSection content={content.personalData} />
      <PaymentSection content={content.payment} />
      <CommentsSection content={content.comments} />
      <FormFooter content={content.consents} />
    </QuoteFormShell>
  )
}
