import { createTour } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { Sidebar } from '@/components/Sidebar'
import { AdditionalStep } from '@/components/Tour/Add/AdditionalStep'
import { CityStep } from '@/components/Tour/Add/CityStep'
import { DescribeStep } from '@/components/Tour/Add/DescribeStep'
import { ImageStep } from '@/components/Tour/Add/ImageStep'
import { PreviewStep } from '@/components/Tour/Add/PreviewStep'
import { PricingStep } from '@/components/Tour/Add/PricingStep'
import { SendToReview } from '@/components/Tour/Add/SendToReview'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { isTourExists } from '@/utilities/utilities'
import { useMutation } from '@tanstack/react-query'
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
	{
		id: 7,
		component: <SendToReview />,
	},
]

const Main = () => {
	const { t } = useTranslation()
	const { locale, pathname, query, push } = useRouter()
	const { addTour, tours, removeTour } = useDraftStore(state => state)
	const { mutate, isSuccess } = useMutation(createTour)
	const existingTour = isTourExists(query.id as string, tours)

	const create = () => {
		mutate(
			{ ...existingTour, locale: locale as string },
			{
				onSuccess: () => {
					setStep(prevStep => ++prevStep)
					toast.success('Отправлено на проверку')
					removeTour(query.id as string)
				},
				onError: () => {
					toast.error(
						'Произошла ошибка, попробуйте позднее. Тур сохранен в черновиках',
					)
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
				<div className='flex min-h-screen'>
					<Sidebar className='basis-64 grow-1 shrink-0'></Sidebar>
					<Container className='justify-self-center pt-10 flex flex-col '>
						<div
							className={clsx(
								'flex justify-between',
								step === steps.length - 1 && 'hidden',
							)}
						>
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
								step === steps.length - 1 && 'hidden',
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
									if (step === steps.length - 2) {
										console.log('create')
										return create()
									}
									setStep(prevStep => ++prevStep)
								}}
								disabled={step === steps.length ? true : false}
								className='w-max px-10 truncate sm:px-3'
							>
								{step === steps.length - 2 ? t('sendToVerify') : t('next')}
							</Button>
						</div>
					</Container>
				</div>
			</NoSSR>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
