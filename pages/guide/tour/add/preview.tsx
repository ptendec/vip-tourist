import { getCity } from '@/API/city.service'
import { getProfile } from '@/API/profile.service'
import { createTour } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { Article } from '@/components/Tour/Article'
import { ListOption } from '@/components/Tour/ListOption'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { getNotAddedCategories } from '@/utilities/utilities'
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
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { Tour, useDraftStore } from 'store/draft'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { user } = useFirebaseAuth()
	const { query, push, locale } = useRouter()
	const { addTour, tours, removeTour, editTour } = useDraftStore()
	const { mutate } = useMutation(createTour)

	const [existingTour, setExistingTour] = useState<Tour | undefined>(
		tours.find(tour => tour.id === (query.id as string)),
	)

	const formedImages = [
		existingTour?.mainPhotoUrl,
		...(existingTour?.image_urls?.split('|') ?? []),
	]

	const {
		data: city,
		isLoading,
		isError,
	} = useQuery(['city', existingTour?.city], () =>
		getCity({
			locale: locale as string,
			id: existingTour?.city,
		}),
	)

	const {
		data,
		isLoading: isProfileLoading,
		isError: isProfileError,
	} = useQuery(
		['profile', user?.uid],
		() =>
			getProfile({
				locale: locale as string,
				id: user?.uid as string,
			}),
		{
			enabled: !!user?.uid,
			retry: 0,
			refetchOnWindowFocus: false,
		},
	)

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
				name: '',
			})
		}
	}, [query.id])

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
				profile: user?.uid,
			})
		}
	}, [query.id])

	useEffect(() => {
		setExistingTour(tours.find(tour => tour.id === (query.id as string)))
	}, [tours.find(tour => tour.id === (query.id as string))])

	useEffect(() => {
		if (existingTour)
			editTour(query.id as string, {
				...existingTour,
				...getNotAddedCategories(existingTour),
				id: query.id as string,
			})
	}, [])

	const create = () => {
		mutate(
			{
				...existingTour,
				createdLanguage: locale as string,
				profile: data?.id,
			},
			{
				onSuccess: result => {
					push(`/sendToVerification/?id=${result.id}`)
					setTimeout(() => {
						removeTour(query.id as string)
					}, 3000)
				},
				onError: () => {
					toast.error(t('errorOccuredTryAgain'))
				},
			},
		)
	}

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>

	return (
		<>
			<Head>
				<title>{`${t('tour')} | VipTourist`}</title>
			</Head>
			<NoSSR>
				<Tooltip
					noArrow
					delayShow={200}
					content='Сохранить на время'
					anchorSelect='save'
					place='bottom'
				/>
				<Wrapper>
					<Container className='justify-self-center pt-10 flex flex-col mx-auto min-h-screen'>
						<div className={clsx('flex justify-between')}>
							<h1 className='font-semibold text-lg'>{t('addTour')}</h1>
							<div className='flex gap-x-4'>
								<Button
									className='!bg-[#D84343] text-white h-8 px-3'
									onClick={() => {
										toast.success('Черновик удален')
										removeTour(query.id as string)
										push('/guide/account', undefined, { shallow: true })
									}}
								>
									{t('cancel')}
								</Button>
								<Button
									id='save'
									className='px-3 h-8'
									onClick={() => {
										toast.success('Изменения сохранены')
										push('/guide/account', undefined, { shallow: true })
									}}
								>
									{t('save')}
								</Button>
							</div>
						</div>
						<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
							<div className='h-[500px] overflow-y-auto scrollbar'>
								<h2 className='font-semibold text-center block mb-5 '>
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
												<SwiperSlide
													key={slide}
													className='rounded-lg mx-auto !h-auto'
												>
													<img
														className='rounded-lg mx-auto object-cover h-full'
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
										description={existingTour?.languages
											?.split('|')
											.map(text => t(text))
											.join(', ')}
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
									<div className='mt-3'>
										<div>
											<p className='font-semibold mb-3 sm:text-sm'>
												{t('whatIncluded')}
											</p>
											<span className='sm:text-sm'>
												{existingTour?.included !== ''
													? existingTour?.included
													: 'Не указано'}
											</span>
										</div>
										<div className='my-3 w-full h-[1px] bg-lightGray' />
										<div>
											<p className='font-semibold mb-3 sm:text-sm'>
												{t('whatNotIncluded')}
											</p>
											<span className='sm:text-sm'>
												{existingTour?.not_included !== ''
													? existingTour?.not_included
													: 'Не указано'}
											</span>
										</div>
										<div className='my-3 w-full h-[1px] bg-lightGray' />
										<Article
											title={t('Важная информация')}
											description={existingTour?.note}
										/>
										<div className='my-3 w-full h-[1px] bg-lightGray' />
									</div>
								</div>
							</div>
						</div>
						<div
							className={clsx(
								'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
							)}
						>
							<Button
								className='w-max px-10 sm:px-3'
								type='button'
								onClick={() => {
									push(
										{
											pathname: 'image',
											query: { id: query.id },
										},
										undefined,
										{ shallow: true },
									)
								}}
							>
								{t('back')}
							</Button>
							<span className='block mx-auto font-bold text-sm uppercase'>
								{t('step')} 5 {t('izz')} 6
							</span>
							<Button
								onClick={create}
								type='submit'
								disabled={!existingTour?.city}
								className='w-max px-10 truncate sm:px-3'
							>
								{t('next')}
							</Button>
						</div>
					</Container>
				</Wrapper>
			</NoSSR>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
