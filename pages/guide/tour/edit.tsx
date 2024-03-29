import { editTour as _editTour, getTour } from '@/API/tour.service'
import { components } from '@/API/types/api.types'
import NoSSR from '@/components/Common/NoSSR'
import { AdditionalStep } from '@/components/Tour/Edit/AdditionalStep'
import { CityStep } from '@/components/Tour/Edit/CityStep'
import { DescribeStep } from '@/components/Tour/Edit/DescribeStep'
import { ImageStep } from '@/components/Tour/Edit/ImageStep'
import { PreviewStep } from '@/components/Tour/Edit/PreviewStep'
import { PricingStep } from '@/components/Tour/Edit/PricingStep'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { json } from '@/utilities/utilities'
import {
	QueryClient,
	dehydrate,
	useMutation,
	useQuery,
} from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { useEditTourStore } from 'store/edit'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['tour', context.params?.id], () =>
		getTour({
			locale: context.locale as string,
			id: context.params?.id as string,
		}),
	)
	return {
		props: {
			dehydratedState: json(dehydrate(queryClient)),
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const steps = [
	{
		id: 1,
		component: <DescribeStep />,
	},
	{
		id: 2,
		component: <CityStep />,
	},
	{
		id: 3,
		component: <AdditionalStep />,
	},
	{
		id: 4,
		component: <PricingStep />,
	},
	{
		id: 5,
		component: <ImageStep />,
	},
	{
		id: 6,
		component: <PreviewStep />,
	},
]

const Main = () => {
	const { t } = useTranslation()
	const { query, push } = useRouter()
	const { addTour, tour, removeTour } = useEditTourStore()

	const { data } = useQuery(['tour', query.id], () =>
		getTour({
			id: query.id as string,
		}),
	)
	const { mutate } = useMutation(_editTour)

	useEffect(() => {
		if (!data) {
			return
		}
		const {
			id,
			languages,
			adult_price,
			city,
			top,
			guide,
			private: _private,
			price,
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
		} = data as components['schemas']['Tour']
		console.log((tour?.id || tour?.id != query.id) && data)
		if (tour?.id != query.id && data)
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
			})
	}, [query.id, data])

	const edit = () => {
		mutate(
			// @ts-expect-error Не существует подобного поля, меня попросили добавить это
			{
				...tour,
				tourUpdated: true,
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

	const [step, setStep] = useState(0)

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
					anchorId='save'
					place='bottom'
				/>
				<Wrapper>
					<Container className='justify-self-center pt-10 flex flex-col mx-auto'>
						<div className={clsx('flex justify-between')}>
							<h1 className='font-semibold text-lg'>{t('addTour')}</h1>
							<div className='flex gap-x-4'>
								<Button
									className='bg-[#D84343] text-white h-8 px-3'
									onClick={() => {
										toast.success('Изменения отменены')
										removeTour(query.id as string)
										push('/guide/account', undefined, { shallow: true })
									}}
								>
									Cancel
								</Button>
							</div>
						</div>
						<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
							{steps[step]?.component}
						</div>

						<div
							className={clsx(
								'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
							)}
						>
							<Button
								onClick={() => {
									setStep(prevStep => --prevStep)
								}}
								disabled={step === 0 ? true : false}
								className='w-max px-10 sm:px-3'
							>
								{t('back')}
							</Button>
							<span className='block mx-auto font-bold text-sm uppercase'>
								{t('step')} {step + 1} {t('izz')} {steps.length}
							</span>

							<Button
								onClick={() => {
									if (step === steps.length - 1) {
										return edit()
									}
									setStep(prevStep => ++prevStep)
								}}
								disabled={step === steps.length ? true : false}
								className='w-max px-10 truncate sm:px-3'
							>
								{step === steps.length - 1 ? t('sendToVerify') : t('next')}
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
