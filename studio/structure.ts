import type { StructureResolver } from 'sanity/structure'
import { singletons } from './schemas'

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items(
      singletons.map(({ name, title }) =>
        S.listItem()
          .title(title ?? name)
          .id(name)
          .child(S.document().schemaType(name).documentId(name)),
      ),
    )
