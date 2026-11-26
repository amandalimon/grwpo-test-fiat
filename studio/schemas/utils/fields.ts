import { defineField, type FieldDefinition } from 'sanity'

export const text = (name: string, description?: string) =>
  defineField({
    name,
    type: 'string',
    description,
    validation: rule => rule.required(),
  })

export const group = (
  name: string,
  fields: FieldDefinition[],
  title?: string,
) =>
  defineField({
    name,
    title,
    type: 'object',
    fields,
    options: { collapsible: true },
  })

const toTitle = (name: string) =>
  name
    .replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`)
    .replace(/^./, first => first.toUpperCase())

export const section = (name: string, fields: FieldDefinition[]) =>
  defineField({
    name,
    title: toTitle(name),
    type: 'object',
    fields,
    group: name,
  })

export const choices = (name: string, values: string[]) =>
  group(name, [
    text('legend'),
    ...values.map(value => text(value)),
    defineField({
      name: 'defaultValue',
      type: 'string',
      options: { list: values, layout: 'radio', direction: 'horizontal' },
      validation: rule => rule.required(),
    }),
  ])

export const heading = [text('title'), text('subtitle')]
