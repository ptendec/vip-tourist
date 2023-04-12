import { getMyOrders } from '@/API/order.service'
import { Sidebar } from '@/components/Layout/Sidebar'
import { NoOrders } from '@/components/Static/Empty/Orders'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale, push } = useRouter()
	const { user } = useFirebaseAuth()

	const { data, isLoading, isError } = useQuery(
		['orders', user?.uid],
		() => getMyOrders({ locale: locale as string, id: user?.uid }),
		{
			retry: false,
		},
	)

	// TODO: Отображать корректно даты
	return (
		<>
			<Head>
				<title>VipTourist</title>
			</Head>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='pt-10 pb-24 flex flex-col xs:pt-0 min-h-screen'>
					{isError ? (
						<NoOrders />
					) : (
						<div className='flex'>
							{data?.map(order => (
								<div key={order.id} className='basis-[440px]'>
									<p>{order.tour?.name}</p>
									<span>{t('ownerName')} </span>
									<p>{order.profile?.name}</p>
									<div className='flex'>
										<div>
											<span>{t('date')}</span>
											<p>{order.date}</p>
										</div>
										<div>
											<span>{t('time')}</span>
											<p>{order.date}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
