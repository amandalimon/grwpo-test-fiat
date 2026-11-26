import { defineArrayMember, defineField, defineType } from 'sanity'
import { text } from '../utils/fields'

export const selectField = defineType({
  name: 'selectField',
  type: 'object',
  fields: [
    text('label'),
    defineField({
      name: 'options',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: rule => rule.required().min(1).unique(),
    }),
  ],
})
