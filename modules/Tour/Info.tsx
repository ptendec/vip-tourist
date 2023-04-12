import { getCurrency } from '@/API/currency.service'
import { components } from '@/API/types/api.types'
import NoSSR from '@/components/Common/NoSSR'
import { Buy } from '@/components/Modal/Buy'
import { ListOption } from '@/components/Tour/ListOption'
import { Button } from '@/components/UI/Button'
import {
	mdiAccount,
	mdiBabyFaceOutline,
	mdiCalendarBlank,
	mdiCheckboxMarkedCircle,
	mdiClockTimeThree,
	mdiHiking,
	mdiMapMarker,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef, useState } from 'react'
import { usePreferencesStore } from 'store/preferences'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour: components['schemas']['Tour']
	city: components['schemas']['City']
}

export const Info = ({ className, tour, city }: Props) => {
	const { t } = useTranslation()
	const { currency } = usePreferencesStore()

	const { data, isLoading } = useQuery(['currency', currency], () =>
		getCurrency(currency.value),
	)

	const [isBuy, setIsBuy] = useState(false)

	return (
		<>
			<NoSSR>
				<Buy isVisible={isBuy} onClose={() => setIsBuy(false)} tour={tour} />
			</NoSSR>

			<div className={clsx(className)}>
				<h1 className='text-xl font-semibold mb-2 mt-8'>{tour.name}</h1>
				<p className='flex mb-3'>
					<Icon size={1} color='#86A545' path={mdiMapMarker} />
					<span className='text-gray text-md'>
						{city.country?.name}, {tour.city?.name}
					</span>
				</p>
				<p className='mb-6'>{tour.description}</p>
				<ListOption
					icon={mdiClockTimeThree}
					title={t('duration')}
					description={`${tour.duration} ${t('hours')}`}
				/>
				<ListOption
					icon={mdiHiking}
					title={t('liveTour')}
					description={tour.languages
						?.split('|')
						.map(text => t(text))
						.join(', ')}
				/>
				{!tour.one_day_trip && (
					<>
						<ListOption
							icon={mdiCheckboxMarkedCircle}
							title={t('Всегда в наличии')}
							description={'Цикличный тур'}
						/>
					</>
				)}
				{tour.date && (
					<ListOption
						icon={mdiCalendarBlank}
						title={t('По каким дням проходит экскурсия')}
						description={new Date(tour.date).toISOString().split('T')[0]}
					/>
				)}
				<NoSSR>
					<ListOption
						icon={mdiAccount}
						title={t('adultPrice')}
						description={`${currency.symbol}  ${
							tour.adult_price
								? Math.ceil(
										(data?.price && data?.price * tour.adult_price) ?? 0,
								  )
								: '-'
						}`}
					/>
					<ListOption
						icon={mdiBabyFaceOutline}
						title={t('childPrice')}
						description={`${currency.symbol}  ${
							tour.child_price
								? Math.ceil(
										(data?.price && data?.price * tour.child_price) ?? 0,
								  )
								: '-'
						}`}
					/>
				</NoSSR>
				<Button
					className='mt-auto mb-6'
					onClick={() => {
						setIsBuy(true)
					}}
				>
					{t('buyNow')}
				</Button>
			</div>
		</>
	)
}
