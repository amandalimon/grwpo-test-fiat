import { SectionTitle } from '@/components/ui/SectionTitle'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import type { PaymentContent } from '@/content/types'

type PaymentSectionProps = {
  content: PaymentContent
}

export function PaymentSection({ content }: PaymentSectionProps) {
  return (
    <section aria-labelledby="payment-title" className="mt-47">
      <SectionTitle
        id="payment-title"
        title={content.title}
        subtitle={content.subtitle}
      />
      <div className="mt-39 grid gap-y-31">
        <SegmentedControl
          name="paymentMethod"
          legend={content.method.legend}
          defaultValue={content.method.defaultValue}
          segments={content.method.options}
        />
        <TextField
          id="downPayment"
          inputMode="decimal"
          label={content.downPayment.label}
          placeholder={content.downPayment.placeholder}
        />
        <SelectField
          id="term"
          label={content.term.label}
          options={content.term.options}
          defaultValue={content.term.defaultValue}
        />
      </div>
    </section>
  )
}
