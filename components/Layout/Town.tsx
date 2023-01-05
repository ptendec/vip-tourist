import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import { City } from '@/API/types/City'
import clsx from 'clsx'
interface Props extends ComponentPropsWithoutRef<'div'> {
	city: City
}

export const Town = ({ city, className }: Props) => {
	return (
		<div
			className={clsx('rounded-lg relative w-3/12 flex flex-col ', className)}
		>
			<span className='w-full h-32 relative inline-block'>
				<Image
					src={`${process.env.NEXT_PUBLIC_API_URL}${city.image.url}`}
					alt={city.image.alternativeText}
					fill
					className='rounded-lg'
				></Image>
			</span>
			<span
				className='bottom-3 absolute right-3 rounded-lg
         text-white font-bold '
			>
				{city.name}
			</span>
		</div>
	)
}
