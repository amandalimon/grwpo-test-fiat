import type { Option } from '@/content/types'

export const toOptions = (labels: string[]): Option[] =>
  labels.map(label => ({
    value: label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    label,
  }))
