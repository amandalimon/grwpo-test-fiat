import { EmailIcon, PhoneIcon } from '@/components/icons'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { TextField } from '@/components/ui/TextField'
import { fieldLimits } from '../schema'
import type { PersonalDataContent } from '../types'

const icons = { phone: <PhoneIcon />, email: <EmailIcon /> }

type PersonalDataSectionProps = {
  content: PersonalDataContent
}

export function PersonalDataSection({ content }: PersonalDataSectionProps) {
  const { contactMethod } = content

  return (
    <section
      aria-labelledby="personal-data-title"
      className="mt-36 md:mt-66 lg:mt-71"
    >
      <SectionTitle
        id="personal-data-title"
        title={content.title}
        subtitle={content.subtitle}
      />
      <div className="mt-41 grid gap-y-33 md:mt-40 md:grid-cols-3 md:gap-x-62 md:gap-y-49 lg:grid-cols-[225fr_226fr_228fr] lg:gap-x-72">
        <TextField
          id="firstName"
          label={content.firstName.label}
          placeholder={content.firstName.placeholder}
          autoComplete="given-name"
          required
          maxLength={fieldLimits.name}
        />
        <TextField
          id="lastName"
          label={content.lastName.label}
          placeholder={content.lastName.placeholder}
          autoComplete="family-name"
          required
          maxLength={fieldLimits.name}
        />
        <TextField
          id="secondLastName"
          label={content.secondLastName.label}
          placeholder={content.secondLastName.placeholder}
          autoComplete="additional-name"
          maxLength={fieldLimits.name}
        />
        <TextField
          id="email"
          type="email"
          label={content.email.label}
          placeholder={content.email.placeholder}
          autoComplete="email"
          required
          maxLength={fieldLimits.email}
        />
        <TextField
          id="phone"
          type="tel"
          label={content.phone.label}
          placeholder={content.phone.placeholder}
          autoComplete="tel"
          required
          maxLength={fieldLimits.phone}
        />
        <SegmentedControl
          name="contactMethod"
          className="md:col-span-3"
          legend={contactMethod.legend}
          defaultValue={contactMethod.defaultValue}
          segments={contactMethod.options.map(option => ({
            value: option.value,
            label: option.label,
            icon: option.icon && icons[option.icon],
          }))}
        />
      </div>
    </section>
  )
}
