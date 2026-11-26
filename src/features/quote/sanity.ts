import { fillTemplate } from '@/lib/fill-template'
import { toOptions } from '@/lib/to-options'
import type {
  ChoiceGroup,
  ChoiceIcon,
  CommentsContent,
  ConsentsContent,
  HeroContent,
  QuoteFormContent,
  SectionHeading,
  SelectFieldCopy,
  SubmissionContent,
  TextFieldCopy,
} from './types'

type SelectFieldDocument = {
  label: string
  options: string[]
}

type ChoicesDocument<Value extends string> = Record<Value, string> & {
  legend: string
  defaultValue: Value
}

export type QuoteFormDocument = {
  hero: HeroContent
  vehicle: {
    legend: string
    placeholder: string
    model: SelectFieldDocument
    version: SelectFieldDocument
    state: SelectFieldDocument
    dealer: SelectFieldDocument
  }
  personalData: SectionHeading & {
    firstName: TextFieldCopy
    lastName: TextFieldCopy
    secondLastName: TextFieldCopy
    email: TextFieldCopy
    phone: TextFieldCopy
    contactMethod: ChoicesDocument<'phone' | 'email' | 'both'>
  }
  payment: SectionHeading & {
    method: ChoicesDocument<'cash' | 'credit'>
    downPayment: TextFieldCopy
    term: {
      label: string
      optionLabel: string
      months: number[]
      defaultValue: number
    }
  }
  comments: CommentsContent
  consents: ConsentsContent
  submission: SubmissionContent
}

const icons: Partial<Record<string, ChoiceIcon>> = {
  phone: 'phone',
  email: 'email',
}

const toTextField = ({ label, placeholder }: TextFieldCopy): TextFieldCopy => ({
  label,
  placeholder,
})

const toSelectField = ({
  label,
  options,
}: SelectFieldDocument): SelectFieldCopy => ({
  label,
  options: toOptions(options),
})

const toChoiceGroup = <Value extends string>(
  group: ChoicesDocument<Value>,
  values: readonly Value[],
): ChoiceGroup => ({
  legend: group.legend,
  defaultValue: group.defaultValue,
  options: values.map(value => ({
    value,
    label: group[value],
    icon: icons[value],
  })),
})

export function toQuoteFormContent({
  hero,
  vehicle,
  personalData,
  payment,
  comments,
  consents,
  submission,
}: QuoteFormDocument): QuoteFormContent {
  return {
    hero,
    vehicle: {
      legend: vehicle.legend,
      placeholder: vehicle.placeholder,
      model: toSelectField(vehicle.model),
      version: toSelectField(vehicle.version),
      state: toSelectField(vehicle.state),
      dealer: toSelectField(vehicle.dealer),
    },
    personalData: {
      title: personalData.title,
      subtitle: personalData.subtitle,
      firstName: toTextField(personalData.firstName),
      lastName: toTextField(personalData.lastName),
      secondLastName: toTextField(personalData.secondLastName),
      email: toTextField(personalData.email),
      phone: toTextField(personalData.phone),
      contactMethod: toChoiceGroup(personalData.contactMethod, [
        'phone',
        'email',
        'both',
      ]),
    },
    payment: {
      title: payment.title,
      subtitle: payment.subtitle,
      method: toChoiceGroup(payment.method, ['cash', 'credit']),
      downPayment: toTextField(payment.downPayment),
      term: {
        label: payment.term.label,
        defaultValue: String(payment.term.defaultValue),
        options: payment.term.months.map(months => ({
          value: String(months),
          label: fillTemplate(payment.term.optionLabel, { months }),
        })),
      },
    },
    comments: {
      title: comments.title,
      subtitle: comments.subtitle,
      message: toTextField(comments.message),
    },
    consents,
    submission,
  }
}
