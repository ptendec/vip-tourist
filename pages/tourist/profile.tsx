import { getCities } from '@/API/city.service'
import { getTours } from '@/API/tour.service'
import { Alert } from '@/components/Modal/Alert'
import { Sidebar } from '@/components/Sidebar'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Search } from '@/modules/Search'
import { Towns } from '@/modules/Towns'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
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
			<Alert isVisible={isAlert} onClose={() => setIsAlert(false)} />
			<div className='flex '>
				<Sidebar className='basis-80 grow-1 srhink-0'></Sidebar>
				<Container className='justify-self-center pt-10 pb-24 flex flex-col'>
					<Search></Search>
					<Cards title={t('popularTours')} tours={tours} />
					<Cards title='Популярные' tours={tours} />
					<Towns cities={cities}></Towns>
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
