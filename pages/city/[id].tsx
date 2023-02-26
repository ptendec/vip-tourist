import { getCity } from '@/API/city.service'
import { getTours } from '@/API/tour.service'
import { CityInfo } from '@/components/Layout/CityInfo'
import { Sidebar } from '@/components/Sidebar'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Breadcrumb } from '@/utilities/interfaces'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['city', context.params?.id], () =>
		getCity({
			locale: context.locale as string,
			id: context.params?.id as string,
		}),
	)
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale, query } = useRouter()
	const {
		data: city,
		isLoading: isCityLoading,
		isError: isCityError,
	} = useQuery(['city', query.id], () =>
		getCity({ locale: locale as string, id: query.id as string }),
	)
	const { data, isLoading, isError } = useQuery(['tours'], () =>
		getTours({ locale: locale as string }),
	)
	if (isLoading || isCityLoading) return <>Loading...</>
	if (isError || isCityError) return <>Error!</>

	const breadcrumbs: Breadcrumb[] = [
		{
			id: 1,
			href: '/',
			name: 'home',
		},
		{
			id: 2,
			href: `/city/${city?.id}`,
			name: city?.name,
		},
	]

	// TODO: Попросить добавить описание для города в угоду SEO
	return (
		<>
			<Head>
				<title>{city.name} | VipTourist</title>
				<meta name='description' content={city.name} />
			</Head>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='pt-10 pb-24 flex flex-col max-w-[1200px] xs:pt-0'>
					<Breadcrumbs breadcrumbs={breadcrumbs} />
					<span className='relative h-40 w-full inline-block my-8'>
						<Image fill src='/images/demo.png' alt={''}></Image>
					</span>
					<CityInfo city={city} />
					<Cards title={t('popularTours')} tours={city.tours} />
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
