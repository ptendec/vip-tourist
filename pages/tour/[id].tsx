import { FilterSidebar } from '@/components/FilterSidebar'
import { Sidebar } from '@/components/Sidebar'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { additionalInfoList, staticBreadcrumbs } from 'utilities/static'
import { CityInfo } from '@/components/Layout/CityInfo'
import Image from 'next/image'
import { Cards } from '@/modules/Cards'
import { getTour, getTours } from '@/API/tour.service'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/dist/client/router'
import { useTranslation } from 'react-i18next'
import { Info } from '@/modules/Tour/Info'
import { Photos } from '@/modules/Tour/Photos'
import { Article } from '@/components/Tour/Article'
import { AdditionalInfo } from '@/modules/Tour/AdditionalInfo'
import { Review } from '@/components/Tour/Review'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next/types'
import { getCountry } from '@/API/country.service'
import { Reviews } from '@/modules/Tour/Reviews'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['tour', context.params?.id], () =>
		getTour({
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
	const { locale, query } = useRouter()
	const { t } = useTranslation()
	const {
		data: tour,
		isLoading: isTourLoading,
		isError: isTourError,
		isSuccess: isTourSuccess,
	} = useQuery(['tour', query?.id], () =>
		getTour({ locale: locale as string, id: query.id as string }),
	)
	console.log(tour?.city?.country)
	const {
		data: country,
		isLoading: isCountryLoading,
		isError: isCountryError,
	} = useQuery(
		['country', tour?.city?.country],
		() =>
			getCountry({
				locale: locale as string,
				id: tour?.city?.country as string,
			}),
		{
			enabled: isTourSuccess,
		},
	)

	if (isTourLoading || isCountryLoading) return <>Loading...</>
	if (isTourError || isCountryError) return <>Error!</>

	return (
		<>
			<Head>
				<title>{tour?.name}</title>
			</Head>
			<Container className='flex flex-row pt-10 pb-24'>
				<Sidebar className='w-80'></Sidebar>
				<div className='w-full h-full'>
					<Breadcrumbs breadcrumbs={staticBreadcrumbs} />
					<div className='flex gap-x-5'>
						<Info country={country} tour={tour} className='basis-1/2' />
						<Photos className='flex flex-col basis-1/2 gap-5' />
					</div>
					<AdditionalInfo additionalInfos={additionalInfoList} />
					<Reviews reviews={tour.reviews} />
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
