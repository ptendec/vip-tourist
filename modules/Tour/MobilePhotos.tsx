import { components } from '@/API/types/api.types'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	info?: string
	images?: components['schemas']['Tour']['image_urls']
}

export const MobilePhotos = ({ className, images }: Props) => {
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
				className={clsx(
					className,
					'cursor-pointer lg:block hidden mt-5',
					isView && 'invisible',
				)}
			>
				<Swiper
					modules={[Pagination]}
					autoplay={true}
					spaceBetween={20}
					breakpoints={{
						768: {
							slidesPerView: 2,
						},
						576: {
							slidesPerView: 1.5,
						},
						0: {
							slidesPerView: 1.4,
						},
					}}
					className='noselect rounded-lg mt-4'
					pagination={{
						dynamicBullets: true,
					}}
					centeredSlides={true}
					mousewheel={{ forceToAxis: false, invert: true }}
				>
					{formedImages &&
						formedImages.map(slide => (
							<SwiperSlide key={slide}>
								<img
									onClick={() => {
										setIsView(true)
									}}
									className='rounded-lg xs:h-[200px] xs:w-full sm:h-[240px] sm:w-full max-h-[300px] mx-auto'
									alt=''
									src={slide}
								/>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</>
	)
}
