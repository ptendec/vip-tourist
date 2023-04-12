import { getCity } from '@/API/city.service'
import { getToursByCity, getToursByCityFromCatalogue } from '@/API/tour.service'
import { CityInfo } from '@/components/Layout/CityInfo'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { Breadcrumb } from '@/utilities/interfaces'
import { json } from '@/utilities/utilities'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['city', context.params?.id], () =>
		getCity({
			locale: context.locale as string,
			id: context.params?.id as string,
		}),
	)

	await queryClient.prefetchQuery(['toursOfCity', context.params?.id], () =>
		getToursByCity({
			locale: context.locale as string,
			id: context.params?.id as string,
			categories: [],
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
	const { t } = useTranslation()
	const { locale, query, push, asPath } = useRouter()
	const {
		data: city,
		isLoading: isCityLoading,
		isError: isCityError,
	} = useQuery(['city', query['city.id']], () =>
		getCity({ locale: locale as string, id: query['city.id'] as string }),
	)
	console.log(asPath.replace('/city/[id]', ''))

	const { data, isLoading, isError, refetch } = useQuery(
		['toursOfCity', query['city.id']],
		() =>
			getToursByCityFromCatalogue({
				locale: locale as string,
				id: query['city.id'] as string,
				categories: new URLSearchParams(
					query as Record<string, string>,
				).toString(),
			}),
	)

	useEffect(() => {
		refetch()
	}, [query])

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
				<title>{`${city.name} | VipTourist`}</title>
				<meta name='description' content={city.name} />
			</Head>
			<Wrapper>
				<Container className='pt-10 xs:pt-0 pb-24 mx-auto'>
					<Breadcrumbs className='xs:hidden' breadcrumbs={breadcrumbs} />
					<span className='relative h-40 w-full inline-block my-8 xs:mt-0 xs:w-[calc(100%_+_32px)] xs:-ml-4 rounded-lg'>
						<Image
							style={{
								objectFit: 'cover',
							}}
							className='rounded-lg xs:rounded-none'
							fill
							src={`${process.env.NEXT_PUBLIC_API_URL}${city.image.url}`}
							alt={'Image of city'}
						></Image>
					</span>
					<CityInfo city={city} />
					<Cards title={t('tours')} tours={data} />
				</Container>
			</Wrapper>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
