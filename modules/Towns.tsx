import { components } from '@/API/types/api.types'
import { Town } from '@/components/Layout/Town'
import { useTranslation } from 'next-i18next'

interface Props {
	cities: components['schemas']['City'][]
}

export const Towns = ({ cities }: Props) => {
	const { t } = useTranslation()

	return (
		<div>
			<p className='font-semibold text-lg mb-4 mt-8'>{t('city')}</p>
			<div className='flex flex-row overflow-hidden flex-wrap gap-x-5 xs:justify-center'>
				{cities.map(city => (
					<Town className='' key={city.id} city={city} />
				))}
			</div>
		</div>
	)
}
