import { searchCity } from '@/API/city.service'
import { searchTour } from '@/API/tour.service'
import { Footer } from '@/components/Layout/Footer'
import { Sidebar } from '@/components/Layout/Sidebar'
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
		searchCity({
			locale: context.locale as string,
			name: context.query.text as string,
		}),
	)
	await queryClient.prefetchQuery(['cities'], () =>
		searchTour({
			locale: context.locale as string,
			name: context.query.text as string,
		}),
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
	const { locale, query } = useRouter()
	const {
		data: tours,
		isLoading: isToursLoading,
		isError: isToursError,
	} = useQuery(['tours', query.text], () =>
		searchTour({ locale: locale as string, name: query.text as string }),
	)

	const {
		data: cities,
		isLoading: isCitiesLoading,
		isError: isCitiesError,
	} = useQuery(['search', 'cities', query.text], () =>
		searchCity({ locale: locale as string, name: query.text as string }),
	)

	const [isAlert, setIsAlert] = useState(Math.random() < 0.9)

	if (isCitiesLoading || isToursLoading) return <>Loading...</>
	if (isToursError || isCitiesError) return <>Error!</>

	return (
		<>
			<Head>
				<title>VipTourist</title>
			</Head>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='pt-10 pb-24 flex flex-col max-w-[1200px] xs:pt-0'>
					<Search />
					<Cards title={t('tours')} tours={tours} />
					<Towns cities={cities}></Towns>
					<Footer />
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
