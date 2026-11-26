import { defineField, defineType } from 'sanity'
import { text } from '../utils/fields'

export const navigationLink = defineType({
  name: 'navigationLink',
  type: 'object',
  fields: [
    text('label'),
    defineField({
      name: 'href',
      type: 'string',
      description: 'A full URL or an anchor on this page, such as #cotizar.',
      validation: rule =>
        rule
          .required()
          .custom(href =>
            !href || /^(https?:\/\/|#)/.test(href)
              ? true
              : 'Use a full URL or an anchor.',
          ),
    }),
    defineField({
      name: 'desktopOnly',
      type: 'boolean',
      description: 'Hide this link in the tablet header.',
      initialValue: false,
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
})
