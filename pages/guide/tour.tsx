import { Sidebar } from '@/components/Sidebar'
import { AdditionalStep } from '@/components/Tour/Add/AdditionalStep'
import { CityStep } from '@/components/Tour/Add/CityStep'
import { DescribeStep } from '@/components/Tour/Add/DescribeStep'
import { ImageStep } from '@/components/Tour/Add/ImageStep'
import { PricingStep } from '@/components/Tour/Add/PricingStep'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
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
]

const Main = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours } = useDraftStore(state => state)

	const [step, setStep] = useState(0)

	return (
		<>
			<Head>
				<title>{`${t('tour')} | VipTourist`}</title>
			</Head>
			<Tooltip
				noArrow
				delayShow={200}
				content='Сохранить на время'
				anchorId='save'
				place='bottom'
			/>

			<div className='flex min-h-screen'>
				<Sidebar className='basis-64 grow-1 shrink-0'></Sidebar>
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
