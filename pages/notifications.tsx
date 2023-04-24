import { getNotifications } from '@/API/notification.service'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { Breadcrumb } from '@/utilities/interfaces'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { ReactElement } from 'react'

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

	const notificationsBreadcrumbs: Breadcrumb[] = [
		{
			id: 1,
			name: 'home',
			href: '/',
		},
		{
			id: 2,
			name: 'notification',
			href: '/notifications',
		},
	]

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error...</>

	return (
		<>
			<Head>
				<meta name='robots' content='noindex' />
				<title>{t('notification')} | VipTourist</title>
			</Head>
			<Wrapper>
				<Container className='flex flex-row pt-10 pb-24 mx-auto'>
					<div className='w-full'>
						<div className='w-full h-full min-h-screen flex flex-col'>
							<Breadcrumbs
								className='self-start mb-8'
								breadcrumbs={notificationsBreadcrumbs}
							/>
							{data.map(item => (
								<div
									key={item.id}
									className='w-1/2 border border-lightGray rounded-lg px-3 py-2 shadow-lg'
								>
									<p className='font-medium'>{item.title}</p>
									<span className='text-sm'>{item.body}</span>
								</div>
							))}
						</div>
					</div>
				</Container>
			</Wrapper>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
