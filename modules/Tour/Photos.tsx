import { components } from '@/API/types/api.types'
import { mdiImageRemoveOutline } from '@mdi/js'
import Icon from '@mdi/react'
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
	console.log(images?.split('|'))
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
				className={clsx(className, ' cursor-pointer')}
				onClick={() => {
					setIsView(true)
				}}
			>
				<span className='relative w-full h-[200px] inline-block'>
					{images?.split('|')[0] ? (
						<Image
							sizes='100%'
							fill
							src={images?.split('|')[0]}
							alt={''}
							className='rounded-lg'
						/>
					) : (
						<span className='w-full h-full flex bg-lightGray rounded-lg items-center justify-center'>
							<Icon path={mdiImageRemoveOutline} size={5} color='#BFBFBF' />
						</span>
					)}
				</span>
				<div className='flex w-full gap-x-5'>
					<span className='relative basis-1/2 h-[200px] inline-block'>
						{images?.split('|')[1] ? (
							<Image
								sizes='100%'
								fill
								src={images?.split('|')[1]}
								alt={''}
								className='rounded-lg'
							/>
						) : (
							<span className='w-full h-full flex bg-lightGray rounded-lg items-center justify-center'>
								<Icon path={mdiImageRemoveOutline} size={5} color='#BFBFBF' />
							</span>
						)}
					</span>
					<span className='relative basis-1/2 h-[200px] inline-block'>
						{images?.split('|')[2] ? (
							<Image
								sizes='100%'
								fill
								src={images?.split('|')[2]}
								alt={''}
								className='rounded-lg'
							/>
						) : (
							<span className='w-full h-full flex bg-lightGray rounded-lg items-center justify-center'>
								<Icon path={mdiImageRemoveOutline} size={5} color='#BFBFBF' />
							</span>
						)}
					</span>
				</div>
				<div className='flex w-full gap-x-5'>
					<span className='relative basis-1/2 h-[200px] inline-block'>
						{images?.split('|')[3] ? (
							<Image
								sizes='100%'
								fill
								src={images?.split('|')[3]}
								alt={''}
								className='rounded-lg'
							/>
						) : (
							<span className='w-full h-full flex bg-lightGray rounded-lg items-center justify-center'>
								<Icon path={mdiImageRemoveOutline} size={5} color='#BFBFBF' />
							</span>
						)}
					</span>
					<span className='relative basis-1/2 h-[200px] inline-block'>
						{images?.split('|')[4] ? (
							<Image
								sizes='100%'
								fill
								src={images?.split('|')[4]}
								alt={''}
								className='rounded-lg'
							/>
						) : (
							<span className='w-full h-full flex bg-lightGray rounded-lg items-center justify-center'>
								<Icon path={mdiImageRemoveOutline} size={5} color='#BFBFBF' />
							</span>
						)}
					</span>
				</div>
			</div>
		</>
	)
}
