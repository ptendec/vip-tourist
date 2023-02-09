import { getFavourites } from '@/API/tour.service'
import { Sidebar } from '@/components/Sidebar'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavouritesStore } from 'store/favourites'
import { staticBreadcrumbs } from 'utilities/static'

const Main = () => {
	const { locale, query } = useRouter()
	const { t } = useTranslation()
	const { favourites } = useFavouritesStore(state => state)

	const { data, isLoading, isError, refetch } = useQuery(['favourites'], () =>
		getFavourites({ locale: locale as string, tours: favourites }),
	)

	useEffect(() => {
		refetch()
	}, [favourites])

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>

	return (
		<>
			<Head>
				<meta name='robots' content='noindex' />
				<title>{t('wishlist')} | VipTourist</title>
			</Head>
			<Container className='flex flex-row pt-10 pb-24'>
				<Sidebar className='w-80'></Sidebar>
				<div className='w-full h-full'>
					<Breadcrumbs breadcrumbs={staticBreadcrumbs} />
					<Cards title={t('wishlist')} tours={data} />
				</div>
			</Container>
		</>
	)
}

// TODO: Поставить корректные breadcrumbs

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
