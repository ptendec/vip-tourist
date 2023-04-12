import { getProfile } from '@/API/profile.service'
import { createTour } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { Footer } from '@/components/Layout/Footer'
import { AdditionalStep } from '@/components/Tour/Add/AdditionalStep'
import { CityStep } from '@/components/Tour/Add/CityStep'
import { DescribeStep } from '@/components/Tour/Add/DescribeStep'
import { ImageStep } from '@/components/Tour/Add/ImageStep'
import { PreviewStep } from '@/components/Tour/Add/PreviewStep'
import { PricingStep } from '@/components/Tour/Add/PricingStep'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { isTourExists } from '@/utilities/utilities'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { useDraftStore } from 'store/draft'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
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
	const { user } = useFirebaseAuth()
	const { locale, pathname, query, push } = useRouter()
	const { data, isLoading, isError } = useQuery(
		['profile', user?.uid],
		() =>
			getProfile({
				locale: locale as string,
				id: user?.uid as string,
			}),
		{
			retry: 0,
			refetchOnWindowFocus: false,
		},
	)
	const { addTour, tours, removeTour } = useDraftStore()
	const { mutate, isSuccess } = useMutation(createTour)
	const existingTour = isTourExists(query.id as string, tours)

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
							<h1 className='font-semibold text-lg'>Добавить тур</h1>
							<div className='flex gap-x-4'>
								<Button
									className='bg-[#D84343] text-white h-8 px-3'
									onClick={() => {
										toast.success('Черновик удален')
										removeTour(query.id as string)
										push('/guide/account', undefined, { shallow: true })
									}}
								>
									Cancel
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
							{steps[step]?.component}
						</div>

						<div
							className={clsx(
								'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
								step === steps.length && 'hidden',
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
										console.log('create')
										return create()
									}
									setStep(prevStep => ++prevStep)
								}}
								disabled={step === steps.length ? true : false}
								className='w-max px-10 truncate sm:px-3'
							>
								{step === steps.length - 1 ? t('sendToVerify') : t('next')}
							</Button>
						</div>
						<Footer />
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
