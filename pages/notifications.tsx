import { getNotifications } from '@/API/notification.service'
import NoSSR from '@/components/Common/NoSSR'
import { Sidebar } from '@/components/Sidebar'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { ReactElement } from 'react'
import { favouritesBreadcrumbs } from 'utilities/static'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { locale, query } = useRouter()
	const { t } = useTranslation()
	const { user } = useFirebaseAuth()

	const { data, isLoading, isError } = useQuery(['favourites'], () =>
		getNotifications({ locale: locale as string, uid: user?.uid as string }),
	)

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error...</>

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
						<NoSSR>{null}</NoSSR>
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