import { components } from '@/API/types/api.types'
import NoSSR from '@/components/Common/NoSSR'
import { Buy } from '@/components/Modal/Buy'
import { ListOption } from '@/components/Tour/ListOption'
import { Button } from '@/components/UI/Button'
import { mdiClockTimeThree, mdiMapMarker } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour: components['schemas']['Tour']
	country?: components['schemas']['Country']
}
export const Info = ({ className, tour, country }: Props) => {
	const { t } = useTranslation()

	const [isBuy, setIsBuy] = useState(false)

	return (
		<>
			<NoSSR>
				<Buy isVisible={isBuy} onClose={() => setIsBuy(false)} tour={tour} />

				<Tooltip
					anchorId='next'
					content='Купить не получится'
					place='top'
					className='z-30'
					noArrow
				/>
			</NoSSR>
			<div className={clsx(className)}>
				<h1 className='text-xl font-semibold mb-2 mt-8'>{tour.name}</h1>
				<p className='flex mb-3'>
					<Icon size={1} color='#86A545' path={mdiMapMarker} />
					<span className='text-gray text-md '>
						{country?.name}, {tour.city?.name}
					</span>
				</p>
				<p className='mb-6'>{tour.description}</p>
				<ListOption
					icon={mdiClockTimeThree}
					title={t('duration')}
					description={`${tour.duration} ${t('hours')}`}
				/>
				{[1, 2, 3, 4, 5, 6].map(item => (
					<ListOption
						key={item}
						icon={mdiClockTimeThree}
						title='Продолжительность'
						description='4 часа'
					/>
				))}
				<Button
					className='mt-6'
					onClick={() => {
						setIsBuy(true)
					}}
				>
					Купить сейчас
				</Button>
			</div>
		</>
	)
}
