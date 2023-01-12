import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import { City } from '@/API/types/City'
import clsx from 'clsx'
import Link from 'next/link'
import { components } from '@/API/types/api.types'
interface Props extends ComponentPropsWithoutRef<'div'> {
	city: components['schemas']['City']
}

export const Town = ({ city, className }: Props) => {
	return (
		<div
			className={clsx(
				'rounded-lg relative basis-3/12 flex flex-col ',
				className,
			)}
		>
			<Link href={`/city/${city.id}`}>
				<span className='w-full h-32 relative inline-block'>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}${city.image.url}`}
						alt={city.image.alternativeText as string}
						fill
						className='rounded-lg'
					></Image>
				</span>
			</Link>
			<Link href={`/city/${city.id}`}>
				<span
					className='bottom-3 absolute right-3 rounded-lg
         text-white font-bold '
				>
					{city.name}
				</span>
			</Link>
		</div>
	)
}
