import { components } from '@/API/types/api.types'
import clsx from 'clsx'
import Image from 'next/image'
import { ComponentPropsWithoutRef, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'

interface Props extends ComponentPropsWithoutRef<'div'> {
	info?: string
	images?: components['schemas']['Tour']['image_urls']
}

export const Photos = ({ className, images }: Props) => {
	const formedImages = images?.split('|')

	const [isView, setIsView] = useState(false)
	return (
		<>
			{isView && formedImages?.length && (
				<ImageViewer
					src={formedImages}
					disableScroll={false}
					closeOnClickOutside={true}
					onClose={() => setIsView(false)}
				/>
			)}
			<div
				className={clsx(className)}
				onClick={() => {
					setIsView(true)
				}}
			>
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
		</>
	)
}
