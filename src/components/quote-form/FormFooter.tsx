import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import type { ConsentsContent } from '@/content/types'

type FormFooterProps = {
  content: ConsentsContent
}

export function FormFooter({ content }: FormFooterProps) {
  return (
    <div className="mt-50 flex flex-col items-center">
      <div className="flex flex-col gap-19 self-stretch">
        <Checkbox name="acceptPrivacyNotice" defaultChecked required>
          {content.privacy.before}
          <a href={content.privacy.href} className="font-bold underline">
            {content.privacy.link}
          </a>
        </Checkbox>
        <Checkbox name="optOutOfPromotions">{content.promotions}</Checkbox>
      </div>
      <Button type="submit" className="mt-33 w-135 max-md:mr-1">
        {content.submit}
      </Button>
    </div>
  )
}
