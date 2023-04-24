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
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDraftStore } from 'store/draft'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Article } from '../Article'
import { ListOption } from '../ListOption'

export const PreviewStep = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore()
	const existingTour = isTourExists(query.id as string, tours)
	const formedImages = [
		existingTour?.mainPhotoUrl,
		...(existingTour?.image_urls?.split('|') ?? []),
	]

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
	return <></>
}
