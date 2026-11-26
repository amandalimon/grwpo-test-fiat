import { defineArrayMember, defineField, defineType } from 'sanity'
import { navigationLink } from '../objects/navigationLink'
import { text } from '../utils/fields'

export const site = defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    text('brandName'),
    defineField({
      name: 'navigation',
      type: 'array',
      of: [defineArrayMember({ type: navigationLink.name })],
      validation: rule => rule.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Site' }) },
})
