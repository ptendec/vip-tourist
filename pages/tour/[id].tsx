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
import { getTours } from '@/API/tour.service'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/dist/client/router'
import { useTranslation } from 'react-i18next'
import { Info } from '@/modules/Tour/Info'
import { Photos } from '@/modules/Tour/Photos'
import { Article } from '@/components/Tour/Article'
import { AdditionalInfo } from '@/modules/Tour/AdditionalInfo'
import { Review } from '@/components/Tour/Review'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next/types'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale as string, ['common'])),
	},
})

const Main = () => {
	const { locale } = useRouter()
	const { t } = useTranslation()
	return (
		<>
			<Head>
				<title>Проверка</title>
			</Head>
			<Container className='flex flex-row pt-10 pb-24'>
				<Sidebar className='w-80'></Sidebar>
				<div className='w-full h-full'>
					<Breadcrumbs breadcrumbs={staticBreadcrumbs} />
					<div className='flex gap-x-5'>
						<Info className='basis-1/2' />
						<Photos className='flex flex-col basis-1/2 gap-5' />
					</div>
					<AdditionalInfo additionalInfos={additionalInfoList} />
					<Review />
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
