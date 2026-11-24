import { SectionTitle } from '@/components/ui/SectionTitle'
import { TextareaField } from '@/components/ui/TextareaField'
import type { CommentsContent } from '@/content/types'

type CommentsSectionProps = {
  content: CommentsContent
}

export function CommentsSection({ content }: CommentsSectionProps) {
  return (
    <section
      aria-labelledby="comments-title"
      className="mt-51 md:mt-57.5 lg:mt-63.5"
    >
      <SectionTitle
        id="comments-title"
        title={content.title}
        subtitle={content.subtitle}
        className="max-md:-translate-x-2"
      />
      <TextareaField
        id="comments"
        className="mt-39"
        label={content.message.label}
        placeholder={content.message.placeholder}
      />
    </section>
  )
}
