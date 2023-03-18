import { getCity } from '@/API/city.service'
import { getToursByCityFromCatalogue } from '@/API/tour.service'
import { FilterSidebar } from '@/components/Common/FilterSidebar'
import { Sort } from '@/components/Common/Sort'
import { NOT_FOUND } from '@/components/Icons/Tours'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Tag } from '@/components/UI/Tag'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Breadcrumb } from '@/utilities/interfaces'
import { getAddedCategories } from '@/utilities/utilities'
import { mdiFilter, mdiSortVariant } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale, query, asPath, push } = useRouter()
	const {
		data: city,
		isLoading: isCityLoading,
		isError: isCityError,
	} = useQuery(['city', query['city.id']], () =>
		getCity({ locale: locale as string, id: query['city.id'] as string }),
	)

	const [isFilter, setIsFilter] = useState(false)
	const [isSort, setIsSort] = useState(false)

	const { data, isLoading, isError, refetch } = useQuery(
		['toursOfCity', query['city.id']],
		() =>
			getToursByCityFromCatalogue({
				locale: locale as string,
				categories: asPath.replace('/catalogue?', ''),
			}),
	)

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
		{
			id: 2,
			href: asPath,
			name: 'all',
		},
	]

	useEffect(() => {
		refetch()
	}, [asPath, query])

	if (isLoading || isCityLoading) return <>Loading...</>
	if (isCityError) return <>Error!</>
	// `/catalogue/?city.id=${city.id}&${getCategoriesList(categories)}`,

	return (
		<>
			<Head>
				<title>{`${t('catalog')} | VipTourist`}</title>
			</Head>
			<FilterSidebar
				selected={getAddedCategories(query)}
				onClose={() => setIsFilter(false)}
				isVisible={isFilter}
				setFilters={categories => {
					push(
						{
							pathname: '/catalogue',
							query: {
								...categories.reduce((accumulator, value) => {
									return { ...accumulator, [value.value]: true }
								}, {}),
								['city.id']: query['city.id'],
								...(query.sort && { sort: query.sort }),
							},
						},
						undefined,
						{
							shallow: true,
						},
					)
				}}
			/>
			<Sort
				selected={query._sort as string}
				onClose={() => setIsSort(false)}
				isVisible={isSort}
				set={state => {
					const { _sort, ...rest } = query
					console.log(state)
					push(
						{
							pathname: '/catalogue',
							query: { ...rest, ...(state && { _sort: state?.value }) },
						},
						undefined,
						{
							shallow: true,
						},
					)
				}}
			/>
			<div className='w-full flex justify-center h-max  '>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='pt-10 pb-24 flex flex-col'>
					<Breadcrumbs breadcrumbs={breadcrumbs} />
					<div className='flex mt-8 gap-x-3'>
						<Tag
							className='capitalize flex items-center gap-x-2 !py-2'
							isActive={isFilter}
							onClick={() => setIsFilter(prevState => !prevState)}
						>
							<Icon path={mdiFilter} size={0.7} />
							{t('filter')}
						</Tag>
						<Tag
							className='capitalize flex items-center gap-x-2 !py-2'
							isActive={isSort}
							onClick={() => setIsSort(prevState => !prevState)}
						>
							<Icon path={mdiSortVariant} size={0.7} />
							{t('sort')}
						</Tag>
					</div>
					{isError || data.length == 0 ? (
						<div className='h-max mx-auto flex flex-col items-center my-auto'>
							<NOT_FOUND />
							<p className='text-lg mt-10'>{t('noDataFound')}</p>
							<Button
								className='w-8/12 mx-auto mt-4'
								onClick={() => {
									push('/')
								}}
							>
								{t('goToOffers')}
							</Button>
						</div>
					) : (
						<Cards title={t('tours')} tours={data} />
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
