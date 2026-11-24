import { EmailIcon, PhoneIcon } from '@/components/icons'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { TextField } from '@/components/ui/TextField'
import type { PersonalDataContent } from '@/content/types'

const icons = { phone: PhoneIcon, email: EmailIcon }

type PersonalDataSectionProps = {
  content: PersonalDataContent
}

export function PersonalDataSection({ content }: PersonalDataSectionProps) {
  const { contactMethod } = content

  return (
    <section aria-labelledby="personal-data-title" className="mt-36">
      <SectionTitle
        id="personal-data-title"
        title={content.title}
        subtitle={content.subtitle}
      />
      <div className="mt-41 grid gap-y-33">
        <TextField
          id="firstName"
          label={content.firstName.label}
          placeholder={content.firstName.placeholder}
          autoComplete="given-name"
        />
        <TextField
          id="lastName"
          label={content.lastName.label}
          placeholder={content.lastName.placeholder}
          autoComplete="family-name"
        />
        <TextField
          id="secondLastName"
          label={content.secondLastName.label}
          placeholder={content.secondLastName.placeholder}
          autoComplete="additional-name"
        />
        <TextField
          id="email"
          type="email"
          label={content.email.label}
          placeholder={content.email.placeholder}
          autoComplete="email"
        />
        <TextField
          id="phone"
          type="tel"
          label={content.phone.label}
          placeholder={content.phone.placeholder}
          autoComplete="tel"
        />
        <SegmentedControl
          name="contactMethod"
          legend={contactMethod.legend}
          defaultValue={contactMethod.defaultValue}
          segments={contactMethod.options.map(option => ({
            value: option.value,
            label: option.label,
            Icon: option.icon && icons[option.icon],
          }))}
        />
      </div>
    </section>
  )
}
