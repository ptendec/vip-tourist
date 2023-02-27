import { getFavourites } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { Sidebar } from '@/components/Sidebar'
import { NoFavourites } from '@/components/Static/Empty/Favourites'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useFavouritesStore } from 'store/favourites'
import { favouritesBreadcrumbs } from 'utilities/static'

const Main = () => {
	const { locale, query } = useRouter()
	const { t } = useTranslation()
	const { favourites } = useFavouritesStore(state => state)

	const { data, isLoading, isError, refetch } = useQuery(
		['favourites'],
		() => getFavourites({ locale: locale as string, tours: favourites }),
		{
			enabled: !!favourites.length,
			retry: false,
		},
	)

	useEffect(() => {
		refetch()
	}, [favourites])

	if (isLoading) return <>Loading...</>

	return (
		<>
			<Head>
				<meta name='robots' content='noindex' />
				<title>{t('wishlist')} | VipTourist</title>
			</Head>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='flex flex-row pt-10 pb-24'>
					<div className='w-full h-full min-h-screen flex flex-col'>
						<Breadcrumbs
							className='self-start mb-8'
							breadcrumbs={favouritesBreadcrumbs}
						/>
						<NoSSR>
							{favourites.length === 0 || isError ? (
								<NoFavourites />
							) : (
								<Cards tours={data} />
							)}
						</NoSSR>
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
