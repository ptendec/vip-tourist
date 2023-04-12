import { getCity } from '@/API/city.service'
import { isTourExists } from '@/utilities/utilities'
import {
	mdiAccount,
	mdiBabyFaceOutline,
	mdiCalendarBlank,
	mdiCheckboxMarkedCircle,
	mdiClockTimeThree,
	mdiHiking,
	mdiMapMarker,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDraftStore } from 'store/draft'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ListOption } from '../ListOption'

export const PreviewStep = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore()
	const existingTour = isTourExists(query.id as string, tours)
	const formedImages = existingTour?.image_urls?.split('|')

	const {
		data: city,
		isLoading: isCityLoading,
		isError: isCityError,
	} = useQuery(['city', existingTour?.city], () =>
		getCity({
			locale: locale as string,
			id: existingTour?.city,
		}),
	)

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
				name: '',
			})
		}
	}, [query.id])
	// TODO: Отображение языков корректно
	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>
				{t('Предварительный просмотр')}
			</h2>
			<div className={clsx('cursor-pointer mt-5')}>
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
									className='rounded-lg xs:h-[200px] xs:w-full sm:h-[240px] sm:w-full max-h-[300px] mx-auto'
									alt=''
									src={slide}
								/>
							</SwiperSlide>
						))}
				</Swiper>
			</div>

			<div>
				<h1 className='text-xl font-semibold mb-2 mt-8'>
					{existingTour?.name}
				</h1>
				<p className='flex mb-3'>
					<Icon size={1} color='#86A545' path={mdiMapMarker} />
					<span className='text-gray text-md '>
						{city?.country?.name}, {city?.name}
					</span>
				</p>
				<p className='mb-6'>{existingTour?.description}</p>
				<ListOption
					icon={mdiClockTimeThree}
					title={t('duration')}
					description={`${existingTour?.duration} ${t('hours')}`}
				/>
				<ListOption
					icon={mdiHiking}
					title={t('liveTour')}
					description={existingTour?.languages?.split('|').join(', ')}
				/>
				{!existingTour?.one_day_trip && (
					<>
						<ListOption
							icon={mdiCheckboxMarkedCircle}
							title={t('Всегда в наличии')}
							description={'Цикличный тур'}
						/>
					</>
				)}
				{existingTour?.date && (
					<ListOption
						icon={mdiCalendarBlank}
						title={t('По каким дням проходит экскурсия')}
						description={
							new Date(existingTour?.date).toISOString().split('T')[0]
						}
					/>
				)}
				<ListOption
					icon={mdiAccount}
					title={t('adultPrice')}
					description={`$ ${existingTour?.adult_price ?? '-'}`}
				/>
				<ListOption
					icon={mdiBabyFaceOutline}
					title={t('childPrice')}
					description={`$ ${existingTour?.child_price ?? '-'}`}
				/>
			</div>
		</>
	)
}
