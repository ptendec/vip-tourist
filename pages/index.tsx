import { Sidebar } from '@/components/Sidebar'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Search } from '@/modules/Search'
import { Layout } from '@/modules/Layout'
import { Towns } from '@/modules/Towns'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { getTours } from '@/API/tour.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AlertModal } from '@/components/Modal/AlertModal'
import { getCities } from '@/API/city.service'

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
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale } = useRouter()
	const {
		data: tours,
		isLoading: isToursLoading,
		isError: isToursError,
	} = useQuery(['tours'], () => getTours({ locale: locale as string }))

	const {
		data: cities,
		isLoading: isCitiesLoading,
		isError: isCitiesIsError,
	} = useQuery(['cities'], () => getCities({ locale: locale as string }))

	const [isAlert, setIsAlert] = useState(false)
	if (isCitiesLoading || isToursLoading) return <>Loading...</>
	if (isToursError || isCitiesIsError) return <>Error!</>
	return (
		<>
			<Head>
				<title>Проверка</title>
			</Head>
			<AlertModal isVisible={isAlert} onClose={() => setIsAlert(false)} />
			<Container className='flex flex-row pt-10 pb-24'>
				<Sidebar className='w-80 shrink-0 grow-0'></Sidebar>
				<div className='w-full h-full grow-1'>
					<Search></Search>
					<Cards title={t('popularTours')} tours={tours} />
					<Cards title='Популярные' tours={tours} />
					<Towns cities={cities}></Towns>
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
