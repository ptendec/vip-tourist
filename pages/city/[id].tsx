import { getCity } from '@/API/city.service'
import { getToursByCity } from '@/API/tour.service'
import { FilterSidebar } from '@/components/Common/FilterSidebar'
import { CityInfo } from '@/components/Layout/CityInfo'
import { Sidebar } from '@/components/Sidebar'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Breadcrumb, Category } from '@/utilities/interfaces'
import { getCategoriesList, json } from '@/utilities/utilities'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'

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
	const { locale, query } = useRouter()
	const {
		data: city,
		isLoading: isCityLoading,
		isError: isCityError,
	} = useQuery(['city', query.id], () =>
		getCity({ locale: locale as string, id: query.id as string }),
	)
	const [categories, setCategories] = useState<Category[]>([])
	const [isFilter, setIsFilter] = useState(false)

	const { data, isLoading, isError, refetch } = useQuery(
		['toursOfCity', query.id],
		() =>
			getToursByCity({
				locale: locale as string,
				id: query.id as string,
				categories,
			}),
	)
	useEffect(() => {
		refetch()
	}, [categories])

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
			<FilterSidebar
				onClose={() => setIsFilter(false)}
				isVisible={isFilter}
				setFilters={categories => {
					setCategories(categories)
				}}
			/>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='pt-10 xs:pt-0 pb-24 flex flex-col max-w-[1200px] '>
					<Breadcrumbs className='xs:hidden' breadcrumbs={breadcrumbs} />
					<span className='relative h-40 w-full inline-block my-8 xs:mt-0 xs:w-[calc(100%_+_32px)] xs:-ml-4'>
						<Image fill src='/images/demo.png' alt={''}></Image>
					</span>
					<CityInfo
						showFilter={() => setIsFilter(prevState => !prevState)}
						city={city}
					/>
					<Link
						href={`/catalogue/?${getCategoriesList(categories)}&city.id=${
							city.id
						}`}
						className='text-green font-semibold text-sm ml-auto inline-block relative top-14'
					>
						{t('showAll')}
					</Link>
					<Cards title={t('tours')} tours={data} />
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
