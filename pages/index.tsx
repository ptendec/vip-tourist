import { getCities } from '@/API/city.service'
import { getTours } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Alert } from '@/components/Modal/Alert'
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
import { ReactElement } from 'react'
import { usePreferencesStore } from 'store/preferences'
import { calcDayDifference, json } from 'utilities/utilities'

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
	const { lastAlert, setAlert } = usePreferencesStore()
	const {
		data: tours,
		isLoading: isToursLoading,
		isError: isToursError,
	} = useQuery(['tours'], () => getTours({ locale: locale as string }))

	const {
		data: cities,
		isLoading: isCitiesLoading,
		isError: isCitiesError,
	} = useQuery(['cities'], () => getCities({ locale: locale as string }))

	if (isCitiesLoading || isToursLoading) return <>Loading...</>
	if (isToursError || isCitiesError) return <>Error!</>
	return (
		<>
			<Head>
				<title>VipTourist</title>
			</Head>
			<NoSSR>
				<Alert
					isVisible={
						!!(
							lastAlert === undefined ||
							calcDayDifference(new Date(), new Date(lastAlert)) > 7
						)
					}
					onClose={() => setAlert()}
				/>
			</NoSSR>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='pt-10 pb-24 flex flex-col max-w-[1200px] xs:pt-0'>
					<Search />
					<Cards title={t('popularTours')} tours={tours} />
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
