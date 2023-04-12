import { getCurrency } from '@/API/currency.service'
import { components } from '@/API/types/api.types'
import { getRating } from '@/utilities/utilities'
import { mdiCardsHeart, mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { useFavouritesStore } from 'store/favourites'
import { usePreferencesStore } from 'store/preferences'
import { ArrayElement } from 'utilities/interfaces'
import NoSSR from '../Common/NoSSR'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour:
		| components['schemas']['Tour']
		| ArrayElement<components['schemas']['City']['tours']>
}

export const Card = ({ tour, className }: Props) => {
	const { t } = useTranslation()
	const { currency } = usePreferencesStore()
	const { favourites, addFavourite, removeFavourite } = useFavouritesStore()
	const isTourInFavourite = favourites.find(favourite => favourite === tour.id)
	const addToFavourites = () => {
		isTourInFavourite ? removeFavourite(tour.id) : addFavourite(tour.id)
	}

	const { data, isLoading } = useQuery(['currency', currency], () =>
		getCurrency(currency.value),
	)

	return (
		<div
			className={clsx(
				' border-lightGray border rounded-lg relative basis-3/12 flex flex-col max-w-[215px] xs:max-w-none lg:basis-52 xs:basis-10/12 xs:mb-5',
				className,
			)}
		>
			<Link href={`/tour/${tour.id}`}>
				{/* <span className='w-full h-32 relative inline-block rounded-t-lg'> */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={tour.mainPhotoUrl as string}
					alt={tour.name}
					// fill
					className='w-full h-32 relative inline-block rounded-t-lg object-cover'
				/>
				{/* </span> */}
			</Link>
			<span className='top-3 absolute left-3 rounded-lg bg-yellow py-1 px-3 font-bold'>
				<NoSSR>
					{tour.adult_price
						? data?.price
							? `${currency.symbol} ${Math.ceil(
									data.price * tour.adult_price ?? 0,
							  )}`
							: `${currency.symbol} ${tour.adult_price}`
						: data?.price &&
						  tour.price &&
						  `${currency.symbol} ${Math.ceil(data.price * tour.price ?? 0)}`}
				</NoSSR>
			</span>
			<NoSSR>
				<button
					onClick={addToFavourites}
					className='top-3 absolute right-3 rounded-full bg-white p-[4px]'
				>
					<Icon
						path={mdiCardsHeart}
						size={0.7}
						color={isTourInFavourite ? '#EB455F' : '#BFBFBF'}
						className='relative translate-y-[0.5px] '
					/>
				</button>
			</NoSSR>
			<div className='w-full px-3 py-3 rounded-lg border-t-0'>
				<Link href={`/tour/${tour.id}`}>
					<p className='font-semibold text-sm mb-1'>{tour.name}</p>
				</Link>
				<span className='text-gray font-normal mb-2 inline-block'>
					{tour.duration} {t('hours')}
				</span>
				<div className='flex flex-row items-center'>
					<span className='flex flex-row gap-[2px]'>
						{getRating(tour.rating ?? 0).map((element, index) => (
							<Icon key={index} path={mdiStar} size={0.7} color={element} />
						))}
					</span>
					<span className='text-sm text-lightDark ml-2'>
						({tour.reviews?.length} отзывов)
					</span>
				</div>
			</div>
		</div>
	)
}
