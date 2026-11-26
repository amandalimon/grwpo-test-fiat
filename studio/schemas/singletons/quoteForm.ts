import { defineArrayMember, defineField, defineType } from 'sanity'
import { selectField } from '../objects/selectField'
import { textField } from '../objects/textField'
import { choices, group, heading, section, text } from '../utils/fields'

const textInput = (name: string) => defineField({ name, type: textField.name })
const select = (name: string) => defineField({ name, type: selectField.name })

const sections = [
  section('hero', [
    text('overline'),
    text('eyebrow'),
    text('title'),
    text('carAlt'),
  ]),
  section('vehicle', [
    text('legend'),
    text('placeholder', 'First option of every select.'),
    select('model'),
    select('version'),
    select('state'),
    select('dealer'),
  ]),
  section('personalData', [
    ...heading,
    textInput('firstName'),
    textInput('lastName'),
    textInput('secondLastName'),
    textInput('email'),
    textInput('phone'),
    choices('contactMethod', ['phone', 'email', 'both']),
  ]),
  section('payment', [
    ...heading,
    choices('method', ['cash', 'credit']),
    textInput('downPayment'),
    group('term', [
      text('label'),
      text(
        'optionLabel',
        'Label of each option. {months} is replaced by the number.',
      ),
      defineField({
        name: 'months',
        type: 'array',
        of: [defineArrayMember({ type: 'number' })],
        validation: rule => rule.required().min(1).unique(),
      }),
      defineField({
        name: 'defaultValue',
        type: 'number',
        description: 'Must be one of the months above.',
        validation: rule => rule.required(),
      }),
    ]),
  ]),
  section('comments', [...heading, textInput('message')]),
  section('consents', [
    group('privacy', [
      text('before', 'Text before the link.'),
      text('link'),
      defineField({
        name: 'href',
        type: 'url',
        validation: rule => rule.required(),
      }),
    ]),
    text('promotions'),
    text('submit'),
    text('submitting'),
  ]),
  section('submission', [
    group('errorSummary', [
      text('one'),
      text('other', '{count} is replaced by the number of fields.'),
    ]),
    text('failed'),
    group('confirmation', [
      text('title', '{name} is replaced by the first name.'),
      text('subtitle'),
      text(
        'credit',
        '{method} and {term} are replaced by the selected options.',
      ),
      text('downPayment', '{amount} is replaced by the formatted amount.'),
      group('contact', [text('phone'), text('email'), text('both')]),
      text('newQuote'),
    ]),
  ]),
]

export const quoteForm = defineType({
  name: 'quoteForm',
  title: 'Quote form',
  type: 'document',
  groups: sections.map(({ name, title }, index) => ({
    name,
    title,
    default: index === 0,
  })),
  fields: sections,
  preview: { prepare: () => ({ title: 'Quote form' }) },
})
