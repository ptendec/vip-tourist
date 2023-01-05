import { mdiMapMarker } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'

interface Props extends ComponentPropsWithoutRef<'div'> {
	info?: string
}

export const Photos = ({ className }: Props) => {
	return (
		<div className={clsx(className)}>
			<span className='relative w-full h-[200px] inline-block'>
				<Image sizes='100%' fill src='/images/demo5.png' alt={''} />
			</span>
			<div className='flex w-full gap-x-5'>
				<span className='relative basis-1/2 h-[200px] inline-block'>
					<Image sizes='100%' src='/images/demo6.png' fill alt='' />
				</span>
				<span className='relative basis-1/2 h-[200px] inline-block'>
					<Image sizes='100%' src='/images/demo7.png' fill alt='' />
				</span>
			</div>
			<div className='flex w-full gap-x-5'>
				<span className='relative basis-1/2 h-[200px] inline-block'>
					<Image sizes='100%' src='/images/demo7.png' fill alt='' />
				</span>
				<span className='relative basis-1/2 h-[200px] inline-block'>
					<Image sizes='100%' src='/images/demo6.png' fill alt='' />
				</span>
			</div>
		</div>
	)
}
