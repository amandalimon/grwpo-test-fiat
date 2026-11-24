import { SelectField } from '@/components/ui/SelectField'
import { field } from '../schema'
import type { VehicleContent } from '../types'

type VehicleFieldsProps = {
  content: VehicleContent
}

export function VehicleFields({ content }: VehicleFieldsProps) {
  return (
    <fieldset>
      <legend className="sr-only">{content.legend}</legend>
      <div className="grid gap-y-27 md:grid-cols-2 md:gap-x-30 md:gap-y-43 lg:grid-cols-[395fr_398fr]">
        <SelectField
          id={field('model')}
          label={content.model.label}
          options={content.model.options}
          placeholder={content.placeholder}
          required
        />
        <SelectField
          id={field('version')}
          label={content.version.label}
          options={content.version.options}
          placeholder={content.placeholder}
          required
        />
        <SelectField
          id={field('state')}
          label={content.state.label}
          options={content.state.options}
          placeholder={content.placeholder}
          required
        />
        <SelectField
          id={field('dealer')}
          label={content.dealer.label}
          options={content.dealer.options}
          placeholder={content.placeholder}
          required
        />
      </div>
    </fieldset>
  )
}
