import type { Option } from '@/content/types'

export type SectionHeading = {
  title: string
  subtitle: string
}

export type TextFieldCopy = {
  label: string
  placeholder: string
}

export type SelectFieldCopy = {
  label: string
  options: Option[]
}

export type ChoiceIcon = 'phone' | 'email'

export type ChoiceGroup = {
  legend: string
  defaultValue: string
  options: (Option & { icon?: ChoiceIcon })[]
}

export type HeroContent = {
  overline: string
  eyebrow: string
  title: string
  carAlt: string
}

export type VehicleContent = {
  legend: string
  placeholder: string
  model: SelectFieldCopy
  version: SelectFieldCopy
  state: SelectFieldCopy
  dealer: SelectFieldCopy
}

export type PersonalDataContent = SectionHeading & {
  firstName: TextFieldCopy
  lastName: TextFieldCopy
  secondLastName: TextFieldCopy
  email: TextFieldCopy
  phone: TextFieldCopy
  contactMethod: ChoiceGroup
}

export type PaymentContent = SectionHeading & {
  method: ChoiceGroup
  downPayment: TextFieldCopy
  term: SelectFieldCopy & { defaultValue: string }
}

export type CommentsContent = SectionHeading & {
  message: TextFieldCopy
}

export type ConsentsContent = {
  privacy: {
    before: string
    link: string
    href: string
  }
  promotions: string
  submit: string
  submitting: string
}

export type SubmissionContent = {
  errorSummary: {
    one: string
    other: string
  }
  failed: string
  confirmation: {
    title: string
    subtitle: string
    credit: string
    downPayment: string
    contact: Record<string, string>
    newQuote: string
  }
}

export type QuoteFormContent = {
  hero: HeroContent
  vehicle: VehicleContent
  personalData: PersonalDataContent
  payment: PaymentContent
  comments: CommentsContent
  consents: ConsentsContent
  submission: SubmissionContent
}
