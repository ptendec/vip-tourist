import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import { Tour } from '@/API/types/Tour'
import Icon from '@mdi/react'
import { mdiCardsHeart } from '@mdi/js'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { addFavourite, removeFavourite } from 'store/favourites'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour: Tour
}

export const Card = ({ tour }: Props) => {
	const dispatch = useAppDispatch()
	const favourites = useAppSelector(state => state.favourites.favorites)

	const isTourInFavourite = favourites.find(favourite => favourite === tour._id)
	const addToFavourites = () => {
		isTourInFavourite
			? dispatch(removeFavourite(tour._id))
			: dispatch(addFavourite(tour._id))
	}
	return (
		<div className='rounded-lg relative basis-3/12 flex flex-col'>
			<span className='w-full h-32 relative inline-block rounded-t-lg'>
				<Image
					src={tour.mainPhotoUrl}
					alt={tour.name}
					fill
					className='rounded-t-lg'
				></Image>
			</span>
			<span className='top-3 absolute left-3 rounded-lg bg-yellow py-1 px-3 font-bold'>
				$ {tour.price}
			</span>
			<button
				onClick={addToFavourites}
				className='top-3 absolute right-3 rounded-full bg-white p-[4px] transition-all duration-500 ease-out'
			>
				<Icon
					path={mdiCardsHeart}
					size={0.7}
					color={isTourInFavourite ? '#EB455F' : '#BFBFBF'}
					className='relative translate-y-[0.5px] '
				/>
			</button>
			<div className='w-full px-3 py-3 border-lightGray border rounded-lg border-t-0'>
				<p className='font-semibold text-sm mb-1'>{tour.name}</p>
				<span className='text-gray font-normal mb-2 inline-block'>
					{tour.duration} дней
				</span>
				<div className='flex flex-row items-center'>
					<span className='flex flex-row gap-1'>
						{[1, 2, 3, 4, 5].map(element => (
							<svg
								key={element}
								width='12'
								height='12'
								viewBox='0 0 10 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5 7.635L8.09 9.5L7.27 5.985L10 3.62L6.405 3.315L5 0L3.595 3.315L0 3.62L2.73 5.985L1.91 9.5L5 7.635Z'
									fill='#FFCE1F'
								/>
							</svg>
						))}
					</span>
					<span className='text-sm text-lightDark ml-2'>(6 отзывов)</span>
				</div>
			</div>
		</div>
	)
}
