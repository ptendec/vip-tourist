import { getCities } from '@/API/city.service'
import { getTours } from '@/API/tour.service'
import { Sidebar } from '@/components/Sidebar'
import { AdditionalStep } from '@/components/Tour/Add/AdditionalStep'
import { CityStep } from '@/components/Tour/Add/CityStep'
import { DescribeStep } from '@/components/Tour/Add/DescribeStep'
import { ImageStep } from '@/components/Tour/Add/ImageStep'
import { PricingStep } from '@/components/Tour/Add/PricingStep'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { json } from 'utilities/utilities'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['tours'], () =>
		getTours({ locale: context.locale as string }),
	)
	await queryClient.prefetchQuery(['cities'], () =>
		getCities({ locale: context.locale as string }),
	)
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
			dehydratedState: json(dehydrate(queryClient)),
		},
	}
}

const steps = [
	{
		id: 1,
		component: <CityStep />,
	},
	{
		id: 2,
		component: <DescribeStep />,
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
]

const Main = () => {
	const { t } = useTranslation()
	const { locale, pathname } = useRouter()

	const [step, setStep] = useState(0)

	useEffect(() => {
		console.log(step, steps[step]?.component)
	}, [step])
	return (
		<>
			<Head>
				<title>Проверка</title>
			</Head>
			<Tooltip
				noArrow
				content='Сохранить на время'
				anchorId='save'
				place='bottom'
			/>

			<div className='flex min-h-screen'>
				<Sidebar className='basis-80 grow-1 srhink-0'></Sidebar>
				<Container className='justify-self-center pt-10 flex flex-col'>
					<div className='flex justify-between'>
						<h1 className='font-semibold text-lg'>Добавить тур</h1>
						<div className='flex gap-x-4'>
							<Button className='bg-[#D84343] text-white h-8 px-3'>
								Cancel
							</Button>
							<Button id='save' className='px-3 h-8'>
								{t('save')}
							</Button>
						</div>
					</div>
					<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border'>
						{steps[step]?.component}
					</div>
					<div className='w-full flex mt-auto items-center h-[72px] border-t border-lightGray'>
						<Button
							onClick={() => {
								setStep(step => --step)
							}}
							disabled={step === 0 ? true : false}
							className='w-max px-10'
						>
							{t('back')}
						</Button>
						<span className='block mx-auto font-bold text-sm uppercase'>
							{t('step')} {step + 1} {t('izz')} {steps.length + 1}
						</span>

						<Button
							onClick={() => {
								setStep(step => ++step)
							}}
							disabled={step === steps.length ? true : false}
							className='w-max px-10'
						>
							{t('next')}
						</Button>
					</div>
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
