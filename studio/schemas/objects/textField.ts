import { defineType } from 'sanity'
import { text } from '../utils/fields'

export const textField = defineType({
  name: 'textField',
  type: 'object',
  fields: [text('label'), text('placeholder')],
})
