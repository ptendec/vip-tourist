import { getCities } from '@/API/city.service'
import { getFavourites, getTours } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { Alert } from '@/components/Modal/Alert'
import { InstallApp } from '@/components/Modal/InstallApp'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { Search } from '@/modules/Search'
import { Towns } from '@/modules/Towns'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import 'react-spring-bottom-sheet/dist/style.css'
import { usePreferencesStore } from 'store/preferences'
import { useRecentStore } from 'store/recent'

import { calcDayDifference, json } from 'utilities/utilities'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['tours'], () =>
		getTours({ locale: context.locale as string, query: '_limit=10' }),
	)
	await queryClient.prefetchQuery(['cities'], () =>
		getCities({ locale: context.locale as string, query: '_popular=true' }),
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
	const { recents } = useRecentStore()
	const [isInstallApp, setIsInstallApp] = useState(true)

	const {
		data: recent,
		isLoading,
		isError,
		refetch,
	} = useQuery(
		['favourites'],
		() => getFavourites({ locale: locale as string, tours: recents }),
		{
			enabled: !!recents.length,
			retry: false,
		},
	)

	const {
		data: tours,
		isLoading: isToursLoading,
		isError: isToursError,
	} = useQuery(['tours'], () =>
		getTours({ locale: locale as string, query: '_limit=10' }),
	)

	const {
		data: cities,
		isLoading: isCitiesLoading,
		isError: isCitiesError,
	} = useQuery(['cities'], () =>
		getCities({ locale: locale as string, query: '_popular=true' }),
	)

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
				<InstallApp
					onClose={() => setIsInstallApp(false)}
					isVisible={isInstallApp}
				/>
			</NoSSR>
			<Wrapper>
				<Container className='pt-10 pb-24 flex flex-col mx-auto'>
					<Search />
					<Cards title={t('popularTours')} tours={tours} />
					{recent && recent.length > 0 && (
						<Cards title={t('recentlyWatched')} tours={recent} />
					)}
					<Link
						href={'/cities'}
						className='text-green font-semibold text-sm ml-auto inline-block relative top-14'
					>
						{t('showAll')}
					</Link>
					<Towns cities={cities}></Towns>
				</Container>
			</Wrapper>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
