import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge, validators } from 'tailwind-merge'

const twMerge = extendTailwindMerge<'rules'>({
  extend: {
    theme: {
      text: [validators.isNumber],
      tracking: [validators.isAny],
    },
    classGroups: {
      rules: [{ rules: [validators.isInteger] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
