import { SectionTitle } from '@/components/ui/SectionTitle'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { SelectField } from '@/components/ui/SelectField'
import { TextField } from '@/components/ui/TextField'
import { fieldLimits } from '../schema'
import type { PaymentContent } from '../types'

type PaymentSectionProps = {
  content: PaymentContent
}

export function PaymentSection({ content }: PaymentSectionProps) {
  return (
    <section
      aria-labelledby="payment-title"
      className="mt-47 md:mt-57 lg:mt-63"
    >
      <SectionTitle
        id="payment-title"
        title={content.title}
        subtitle={content.subtitle}
      />
      <div className="mt-39 grid gap-y-31 md:grid-cols-2 md:gap-x-30 md:gap-y-38 lg:mr-86 lg:ml-85 lg:grid-cols-[310fr_312fr]">
        <SegmentedControl
          name="paymentMethod"
          className="md:col-span-2"
          legend={content.method.legend}
          defaultValue={content.method.defaultValue}
          segments={content.method.options}
        />
        <TextField
          id="downPayment"
          inputMode="decimal"
          required
          maxLength={fieldLimits.downPayment}
          label={content.downPayment.label}
          placeholder={content.downPayment.placeholder}
        />
        <SelectField
          id="term"
          label={content.term.label}
          options={content.term.options}
          defaultValue={content.term.defaultValue}
          required
        />
      </div>
    </section>
  )
}
