import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import Icon from '@mdi/react'
import { mdiCardsHeart, mdiStar } from '@mdi/js'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { addFavourite, removeFavourite } from 'store/favourites'
import Link from 'next/link'
import clsx from 'clsx'
import { components } from '@/API/types/api.types'
import { ArrayElement } from 'utilities/interfaces'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour:
		| components['schemas']['Tour']
		| ArrayElement<components['schemas']['City']['tours']>
}

export const Card = ({ tour, className }: Props) => {
	const dispatch = useAppDispatch()
	const favourites = useAppSelector(state => state.favourites.favorites)

	const isTourInFavourite = favourites.find(favourite => favourite === tour.id)
	const addToFavourites = () => {
		isTourInFavourite
			? dispatch(removeFavourite(tour.id))
			: dispatch(addFavourite(tour.id))
	}
	return (
		<div
			className={clsx(
				'rounded-lg relative basis-3/12 flex flex-col',
				className,
			)}
		>
			<Link href={`/tour/${tour.id}`}>
				<span className='w-full h-32 relative inline-block rounded-t-lg'>
					<Image
						src={tour.mainPhotoUrl as string}
						alt={tour.name}
						fill
						className='rounded-t-lg'
					/>
				</span>
			</Link>
			<span className='top-3 absolute left-3 rounded-lg bg-yellow py-1 px-3 font-bold'>
				$ {tour.price}
			</span>
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
			<div className='w-full px-3 py-3 border-lightGray border rounded-lg border-t-0'>
				<Link href={`/tour/${tour.id}`}>
					<p className='font-semibold text-sm mb-1'>{tour.name}</p>
				</Link>
				<span className='text-gray font-normal mb-2 inline-block'>
					{tour.duration} дней
				</span>
				<div className='flex flex-row items-center'>
					<span className='flex flex-row gap-[2px]'>
						{[1, 2, 3, 4, 5].map(element => (
							<Icon key={element} path={mdiStar} size={0.7} color='#FFCE1F' />
						))}
					</span>
					<span className='text-sm text-lightDark ml-2'>(6 отзывов)</span>
				</div>
			</div>
		</div>
	)
}
