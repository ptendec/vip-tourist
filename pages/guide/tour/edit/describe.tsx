import { getTour } from '@/API/tour.service'
import { components } from '@/API/types/api.types'
import NoSSR from '@/components/Common/NoSSR'
import { Button } from '@/components/UI/Button'
import { Categories } from '@/components/UI/Categories'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { MultiSelect } from '@/components/UI/MultiSelect'
import { Textarea } from '@/components/UI/Textarea'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { DescribeFields, ListItem } from '@/utilities/interfaces'
import { langList, staticCategories } from '@/utilities/static'
import {
	getAddedCategories,
	getAddedLanguages,
	removeAllCategories,
} from '@/utilities/utilities'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { useEditTourStore } from 'store/edit'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		trigger,
		setValue,
	} = useForm<DescribeFields>()
	const { t } = useTranslation()
	const { pathname, query, push } = useRouter()
	const { addTour, tour, removeTour, editTour } = useEditTourStore()

	const { data, isLoading, isError } = useQuery(['tour', query.id], () =>
		getTour({
			id: query.id as string,
		}),
	)

	useEffect(() => {
		if (!data) {
			return
		}
		const {
			id,
			languages,
			adult_price,
			city,
			guide,
			private: _private,
			on_water,
			one_day_trip,
			onlyTransfer,
			open_air,
			name,
			nature,
			night,
			not_included,
			note,
			freeTicketNotice,
			active,
			adrenaline,
			adventure,
			airports,
			alwaysAvailable,
			architecture,
			street_art,
			for_kids_activities,
			for_couples_activities,
			theater,
			ticket_must_have,
			towers,
			transferPhotoUrl,
			transferPrice,
			package_tour,
			park,
			placesCount,
			date,
			description,
			duration,
			limousine,
			location_point,
			prerequisites,
			profile,
			prohibitions,
			public_transport,
			mainPhotoUrl,
			memorial,
			minivan,
			museum,
			music,
			requetedCity,
			gallery,
			game,
			invalid_friendly,
			history,
			world_war,
			food,
			square,
			castle,
			bicycle,
			car,
			bicycle_taxi,
			cruise,
			small_group,
			child_price,
			included,
			withTransfer,
			hunting,
			fishing,
			fewDaysTrip,
			startTime,
			weekDays,
			image_urls,
		} = data as components['schemas']['Tour']
		if (data)
			addTour({
				city: city?.id,
				id,
				child_price,
				languages,
				adult_price,
				guide,
				private: _private,
				nature,
				on_water,
				one_day_trip,
				onlyTransfer,
				open_air,
				name,
				night,
				not_included,
				note,
				ticket_must_have,
				package_tour,
				small_group,
				invalid_friendly,
				history,
				world_war,
				street_art,
				adrenaline,
				architecture,
				food,
				museum,
				music,
				for_couples_activities,
				for_kids_activities,
				memorial,
				park,
				gallery,
				square,
				theater,
				castle,
				towers,
				airports,
				bicycle,
				minivan,
				public_transport,
				limousine,
				bicycle_taxi,
				car,
				cruise,
				description,
				location_point,
				requetedCity,
				profile: profile?.id,
				duration,
				prerequisites,
				prohibitions,
				included,
				date,
				alwaysAvailable,
				withTransfer,
				hunting,
				adventure,
				fishing,
				game,
				fewDaysTrip,
				placesCount,
				mainPhotoUrl,
				transferPhotoUrl,
				transferPrice,
				active,
				startTime,
				weekDays,
				freeTicketNotice,
				image_urls,
			})
	}, [query.id, data])

	useEffect(() => {
		setValue('name', tour?.name ?? '')
		setValue('description', tour?.description ?? '')
		setValue('duration', tour?.duration ?? '')
		tour?.placesCount && setValue('seats', tour?.placesCount)

		if (tour?.name) {
			trigger('name')
		}
		if (tour?.description) {
			trigger('description')
		}
		if (tour?.duration) {
			trigger('duration')
		}
		if (tour?.placesCount) {
			trigger('seats')
		}
	}, [data, isLoading, isError, tour])

	const onSubmit = (data: DescribeFields) => {
		if (!tour) return
		if (getAddedCategories(tour).length === 0)
			return toast.error(t('selectCategories'))
		if (getAddedLanguages(tour.languages)?.length === 0) {
			return toast.error(t('chooseLanguages'))
		}
		editTour({
			...tour,
			id: query.id as string,
			name: data.name,
			description: data.description,
			duration: data.duration,
			placesCount: data.seats,
		})
		push(`city?id=${query.id}`)
	}

	useEffect(() => {
		console.log(tour?.languages)
	}, [tour?.languages])
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
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
								<h2 className='font-semibold text-center block mb-5'>
									{t('describeUrTour')}
								</h2>
								<div>
									<Input
										className='mb-5'
										label='Название'
										placeholder={t('enterTourName') as string}
										{...register('name', {
											required: `${t('fieldShouldntBe')}`,
										})}
										error={errors.name?.message}
									/>
									<Textarea
										label={t('desc') as string}
										className='mb-5 h-10'
										placeholder={t('desc') as string}
										{...register('description', {
											required: `${t('fieldShouldntBe')}`,
										})}
										error={errors.description?.message}
									/>
									<Categories
										className='mt-2'
										chosenItems={getAddedCategories(tour)}
										list={staticCategories}
										onChange={(items: ListItem[]) => {
											if (items.length === 0 && tour) {
												editTour({
													...tour,
													...removeAllCategories(tour),
													id: query.id as string,
												})
											} else {
												if (tour) {
													staticCategories.forEach(category => {
														if (
															Object.entries(tour).find(
																elem =>
																	elem[0] ===
																	items.find(
																		item => item.value === category.value,
																	)?.value,
															)
														) {
															// @ts-expect-error Ожидаемая ошибка
															tour[category.value] = true
														} else {
															// @ts-expect-error Ожидаемая ошибка
															tour[category.value] = false
														}
													})
													editTour({
														...tour,
														id: query.id as string,
														name: tour?.name,
														description: tour?.description,
													})
												}
											}
										}}
										label={t('categories')}
									/>
									<span
										key={JSON.stringify(tour)}
										className='capitalize text-xs font-medium'
									>
										{getAddedCategories(tour)
											.map(category => t(category.name))
											.join(', ')}
									</span>
									<div className='flex justify-between mt-5'>
										<Input
											label='Длительность, ч *'
											placeholder='4'
											className='basis-[calc(50%_-_8px)]'
											{...register('duration', {
												required: `${t('fieldShouldntBe')}`,
											})}
											error={errors.duration?.message}
										/>
										<Input
											label={t('seatsAvailable')}
											placeholder='17'
											className='basis-[calc(50%_-_8px)]'
											{...register('seats', {
												required: `${t('fieldShouldntBe')}`,
											})}
											error={errors.seats?.message}
										/>
									</div>
									<MultiSelect
										chosenItems={getAddedLanguages(tour?.languages)}
										className='mt-2'
										list={langList}
										onChange={(items: ListItem[]) => {
											editTour({
												...tour,
												languages: items.map(items => items.name).join('|'),
												id: query.id as string,
											})
										}}
										label={t('chooseLanguages')}
									/>
									<span
										key={JSON.stringify(tour?.languages)}
										className='capitalize text-xs font-medium'
									>
										{tour?.languages &&
											tour?.languages
												?.split('|')
												.map(text => t(text))
												.join(', ')}
									</span>
								</div>
							</div>
							<div
								className={clsx(
									'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
								)}
							>
								<Button
									disabled={pathname.includes('describe')}
									className='w-max px-10 sm:px-3'
								>
									{t('back')}
								</Button>
								<span className='block mx-auto font-bold text-sm uppercase'>
									{t('step')} 1 {t('izz')} 6
								</span>
								<Button
									disabled={
										!isValid ||
										getAddedCategories(tour).length === 0 ||
										getAddedLanguages(tour?.languages).length === 0
									}
									onClick={() => {
										push(
											{
												pathname: 'city',
												query: { id: query.id },
											},
											undefined,
											{ shallow: true },
										)
									}}
									className='w-max px-10 truncate sm:px-3'
								>
									{t('next')}
								</Button>
							</div>
						</form>
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
