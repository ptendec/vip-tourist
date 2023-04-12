import { getCity } from '@/API/city.service'
import { getTour } from '@/API/tour.service'
import { components } from '@/API/types/api.types'
import { Footer } from '@/components/Layout/Footer'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { AdditionalInfo } from '@/modules/Tour/AdditionalInfo'
import { Info } from '@/modules/Tour/Info'
import { MobilePhotos } from '@/modules/Tour/MobilePhotos'
import { Photos } from '@/modules/Tour/Photos'
import { Reviews } from '@/modules/Tour/Reviews'
import { Breadcrumb } from '@/utilities/interfaces'
import { json } from '@/utilities/utilities'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { GetServerSideProps } from 'next/types'
import { ReactElement, useEffect } from 'react'
import { useRecentStore } from 'store/recent'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['tour', context.params?.id], () =>
		getTour({
			locale: context.locale as string,
			id: context.params?.id as string,
		}),
	)
	queryClient.getQueryData(['tour', context.params?.id])
	await queryClient.prefetchQuery(['city', context.params?.id], () =>
		getCity({
			locale: context.locale as string,
			id: (
				queryClient.getQueryData([
					'tour',
					context.params?.id,
				]) as components['schemas']['Tour']
			)?.city?.id,
		}),
	)
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
			dehydratedState: json(dehydrate(queryClient)),
		},
	}
}

const Main = () => {
	const { locale, query } = useRouter()
	const { t } = useTranslation()
	const { addRecent, recents } = useRecentStore()
	const {
		data: tour,
		isLoading: isTourLoading,
		isError: isTourError,
		isSuccess: isTourSuccess,
	} = useQuery(['tour', query?.id], () =>
		getTour({ locale: locale as string, id: query.id as string }),
	)

	const {
		data: city,
		isLoading: isCityLoading,
		isError: isCityError,
	} = useQuery(
		['city', tour?.city?.id],
		() => getCity({ locale: locale as string, id: tour?.city?.id as string }),

		{
			enabled: isTourSuccess,
		},
	)

	useEffect(() => {
		if (!tour) return
		if (recents.find(recent => recent === tour.id)) return
		addRecent(tour.id)
	}, [tour])

	const breadcrumbs: Breadcrumb[] = [
		{
			id: 1,
			href: '/',
			name: 'home',
		},
		{
			id: 2,
			href: `/city/${tour?.city?.id}`,
			name: tour?.city?.name,
		},
		{
			id: 3,
			href: `/tour/${tour?.id}`,
			name: `${tour?.name}`,
		},
	]

	if (isTourLoading || isCityLoading) return <>Loading...</>
	if (isTourError || isCityError) return <>Error!</>

	return (
		<>
			<Head>
				<title>{`${tour.name} | VipTourist`}</title>
				<meta name='description' content={tour.description} />
			</Head>
			<Wrapper>
				<Container className='pt-10 pb-24 flex flex-col xs:pt-5 mx-auto'>
					<Breadcrumbs breadcrumbs={breadcrumbs} />
					<div className='flex gap-x-5 lg:flex-col-reverse'>
						<Info city={city} tour={tour} className='basis-1/2 flex flex-col' />
						<MobilePhotos
							images={tour.image_urls}
							className='flex flex-col basis-1/2 gap-5'
						/>
						<Photos
							images={tour.image_urls}
							className='flex flex-col basis-1/2 gap-5'
						/>
					</div>
					<AdditionalInfo tour={tour} />
					<Reviews reviews={tour.reviews} />
					<Footer />
				</Container>
			</Wrapper>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
