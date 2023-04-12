import { getCities } from '@/API/city.service'
import NoSSR from '@/components/Common/NoSSR'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { Towns } from '@/modules/Towns'
import { favouritesBreadcrumbs } from '@/utilities/static'
import { json } from '@/utilities/utilities'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
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
		data: cities,
		isLoading,
		isError,
	} = useQuery(['cities'], () => getCities({ locale: locale as string }))

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error...</>

	return (
		<>
			<Head>
				<meta name='robots' content='noindex' />
				<title>{`${t('cities')} | VipTourist`}</title>
			</Head>
			<Wrapper>
				<Container className='mx-auto pt-10 pb-24 w-full'>
					<div className='w-full h-full min-h-screen flex flex-col'>
						<Breadcrumbs
							className='self-start mb-8'
							breadcrumbs={favouritesBreadcrumbs}
						/>
						<NoSSR>
							<Towns label='cities' cities={cities} />
						</NoSSR>
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
