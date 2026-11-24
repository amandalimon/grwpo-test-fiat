import { Checkbox } from '@/components/ui/Checkbox'
import type { ConsentsContent } from '../types'
import { SubmitButton } from './SubmitButton'

type FormFooterProps = {
  content: ConsentsContent
}

export function FormFooter({ content }: FormFooterProps) {
  return (
    <div className="mt-50 flex flex-col items-center md:mt-73 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-19 self-stretch md:self-auto">
        <Checkbox name="acceptPrivacyNotice" defaultChecked required>
          {content.privacy.before}
          <a href={content.privacy.href} className="font-bold underline">
            {content.privacy.link}
          </a>
        </Checkbox>
        <Checkbox name="optOutOfPromotions">{content.promotions}</Checkbox>
      </div>
      <SubmitButton
        label={content.submit}
        pendingLabel={content.submitting}
        className="mt-33 w-135 max-md:mr-1 md:mt-0 md:w-142"
      />
    </div>
  )
}
