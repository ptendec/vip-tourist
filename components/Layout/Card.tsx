import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import { Tour } from '@/API/types'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour: Tour
}

export const Card = ({ tour }: Props) => {
	return (
		<div className='rounded-lg relative basis-3/12 flex flex-col'>
			<span className='w-full h-32 relative inline-block rounded-t-lg'>
				<Image
					src={tour.mainPhotoUrl}
					alt=''
					fill
					className='rounded-t-lg'
				></Image>
			</span>
			<span className='top-3 absolute left-3 rounded-lg bg-yellow py-1 px-3 font-bold'>
				$ {tour.price}
			</span>
			<span className='top-3 absolute right-3 rounded-full bg-white p-[6px]'>
				<svg
					width='14'
					height='13'
					viewBox='0 0 14 13'
					fill='none'
					className='translate-y-[1px]'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M7.00016 12.2333L6.0335 11.3533C2.60016 8.24 0.333496 6.18667 0.333496 3.66667C0.333496 1.61333 1.94683 0 4.00016 0C5.16016 0 6.2735 0.54 7.00016 1.39333C7.72683 0.54 8.84016 0 10.0002 0C12.0535 0 13.6668 1.61333 13.6668 3.66667C13.6668 6.18667 11.4002 8.24 7.96683 11.36L7.00016 12.2333Z'
						fill='#BFBFBF'
					/>
				</svg>
			</span>
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
