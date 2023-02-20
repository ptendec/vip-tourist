import { components } from '@/API/types/api.types'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
interface Props extends ComponentPropsWithoutRef<'div'> {
	city: components['schemas']['City']
}

export const Town = ({ city, className }: Props) => {
	return (
		<div
			className={clsx(
				'rounded-lg relative basis-3/12 flex flex-col max-w-[215px] lg:basis-52 xs:gap-x-0 l xs:max-w-none xs:basis-10/12 xs:mb-5',
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
