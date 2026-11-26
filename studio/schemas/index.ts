import { navigationLink } from './objects/navigationLink'
import { selectField } from './objects/selectField'
import { textField } from './objects/textField'
import { quoteForm } from './singletons/quoteForm'
import { site } from './singletons/site'

export const singletons = [site, quoteForm]

export const singletonTypes = new Set<string>(
  singletons.map(({ name }) => name),
)

export const schemaTypes = [
  ...singletons,
  navigationLink,
  selectField,
  textField,
]
