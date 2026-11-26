import { getCliClient } from 'sanity/cli'
import { siteContent } from '../../src/content/site'
import { quoteFormContent } from '../../src/features/quote/content'
import type {
  ChoiceGroup,
  SelectFieldCopy,
  TextFieldCopy,
} from '../../src/features/quote/types'

const textField = ({ label, placeholder }: TextFieldCopy) => ({
  _type: 'textField',
  label,
  placeholder,
})

const selectField = ({ label, options }: SelectFieldCopy) => ({
  _type: 'selectField',
  label,
  options: options.map(option => option.label),
})

const choices = ({ legend, defaultValue, options }: ChoiceGroup) => ({
  legend,
  defaultValue,
  ...Object.fromEntries(options.map(({ value, label }) => [value, label])),
})

const { hero, vehicle, personalData, payment, comments, consents, submission } =
  quoteFormContent

const site = {
  _id: 'site',
  _type: 'site',
  brandName: siteContent.brandName,
  navigation: siteContent.navigation.map(({ label, href, desktopOnly }) => ({
    _key: label.toLowerCase().replace(/\W+/g, '-'),
    _type: 'navigationLink',
    label,
    href,
    desktopOnly: desktopOnly ?? false,
  })),
}

const quoteForm = {
  _id: 'quoteForm',
  _type: 'quoteForm',
  hero,
  vehicle: {
    legend: vehicle.legend,
    placeholder: vehicle.placeholder,
    model: selectField(vehicle.model),
    version: selectField(vehicle.version),
    state: selectField(vehicle.state),
    dealer: selectField(vehicle.dealer),
  },
  personalData: {
    title: personalData.title,
    subtitle: personalData.subtitle,
    firstName: textField(personalData.firstName),
    lastName: textField(personalData.lastName),
    secondLastName: textField(personalData.secondLastName),
    email: textField(personalData.email),
    phone: textField(personalData.phone),
    contactMethod: choices(personalData.contactMethod),
  },
  payment: {
    title: payment.title,
    subtitle: payment.subtitle,
    method: choices(payment.method),
    downPayment: textField(payment.downPayment),
    term: {
      label: payment.term.label,
      optionLabel: '{months} meses',
      months: payment.term.options.map(option => Number(option.value)),
      defaultValue: Number(payment.term.defaultValue),
    },
  },
  comments: {
    title: comments.title,
    subtitle: comments.subtitle,
    message: textField(comments.message),
  },
  consents,
  submission,
}

const client = getCliClient({ apiVersion: '2025-02-19' })

const result = await client
  .transaction()
  .createOrReplace(site)
  .createOrReplace(quoteForm)
  .commit()

console.log(`Seeded ${result.documentIds.join(', ')}`)
