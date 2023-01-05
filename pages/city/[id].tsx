import { FilterSidebar } from '@/components/FilterSidebar'
import { Sidebar } from '@/components/Sidebar'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { staticBreadcrumbs } from 'utilities/static'
import { CityInfo } from '@/components/Layout/CityInfo'
import Image from 'next/image'
import { Cards } from '@/modules/Cards'
import { getTours } from '@/API/tour.service'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/dist/client/router'
import { useTranslation } from 'react-i18next'

const Main = () => {
	const { locale } = useRouter()
	const { data, isLoading, isError } = useQuery(['tours'], () =>
		getTours({ locale: locale as string }),
	)
	const { t } = useTranslation()
	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>
	return (
		<>
			<Head>
				<title>Проверка</title>
			</Head>
			<Container className='flex flex-row pt-10 pb-24'>
				<Sidebar className='w-80'></Sidebar>
				<div className='w-full h-full'>
					<Breadcrumbs breadcrumbs={staticBreadcrumbs} />
					<span className='relative h-40 w-full inline-block my-8'>
						<Image fill src='/images/demo.png' alt={''}></Image>
					</span>
					<CityInfo />
					<Cards title={t('popularTours')} tours={data} />
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
