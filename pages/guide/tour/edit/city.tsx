import { searchCity } from '@/API/city.service'
import NoSSR from '@/components/Common/NoSSR'
import { AdditionalStep } from '@/components/Tour/Add/AdditionalStep'
import { CityStep } from '@/components/Tour/Add/CityStep'
import { DescribeStep } from '@/components/Tour/Add/DescribeStep'
import { ImageStep } from '@/components/Tour/Add/ImageStep'
import { PreviewStep } from '@/components/Tour/Add/PreviewStep'
import { PricingStep } from '@/components/Tour/Add/PricingStep'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { useDebounce } from '@/hooks/useDebounce'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { mdiFlagVariantOff, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, useEffect, useState } from 'react'
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
	const { tour, editTour, removeTour } = useEditTourStore()

	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500)

	const { data, isLoading, isError, refetch } = useQuery(
		['search', 'city'],
		() =>
			searchCity({
				name: searchTerm,
			}),
	)

	useEffect(() => {
		refetch()
	}, [debouncedSearchTerm])

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>
	console.log(tour?.city)
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
						<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
							<h2 className='font-semibold text-center block mb-5'>
								{t('selectCity')}
							</h2>
							<Input
								onChange={event => setSearchTerm(event.currentTarget.value)}
								icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
								placeholder={t('findCity') as string}
							/>

							<div className='scrollbar overflow-y-auto h-[400px] p-[10px] mt-5'>
								{data.map((city, index) => (
									<Fragment key={city.id}>
										<div
											key={index}
											className={clsx(
												'text-sm p-3 rounded-lg hover:bg-[#F6F6F5] cursor-pointer transition-all duration-300 ease-out',
												tour?.city === city.id && 'bg-[#F6F6F5] font-semibold',
											)}
											onClick={() =>
												editTour({
													id: query.id as string,
													city: city.id,
												})
											}
										>
											<div className='flex items-center gap-x-3'>
												{/* @ts-expect-error Типы */}
												{city.country?.flag.url ? (
													<Image
														className='rounded-sm'
														//@ts-expect-error Типы
														src={`${process.env.NEXT_PUBLIC_API_URL}${city.country?.flag.url}`}
														width={22.67}
														height={17}
														alt='flag'
													/>
												) : (
													<Icon path={mdiFlagVariantOff} size={1} />
												)}
												{city.name}
											</div>
										</div>
										<span className='block bg-gray h-[0.33px]' />
									</Fragment>
								))}
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
											pathname: 'describe',
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
								{t('step')} 2 {t('izz')} {steps.length}
							</span>
							<Button
								type='submit'
								disabled={!tour?.city}
								onClick={() => {
									push(
										{
											pathname: 'additional',
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
