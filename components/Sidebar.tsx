import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const Sidebar = (props: ComponentPropsWithoutRef<'div'>) => {
	return (
		<div {...props}>
			<Link href='/' className=''>
				VIP TOURIST
			</Link>
			<div className='mt-10'>
				<Link
					href='/'
					className='flex flex-row items-center group rounded-lg hover:bg-[#F6F6F5] px-7 py-2'
				>
					<svg
						width='20'
						height='17'
						viewBox='0 0 20 17'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='mr-3 group-hover:fill-green fill-gray'
					>
						<path d='M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z' />
					</svg>
					<span className=''>Главная</span>
				</Link>
			</div>
		</div>
	)
}
