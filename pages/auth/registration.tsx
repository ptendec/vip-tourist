import { FilterSidebar } from '@/components/FilterSidebar'
import { Sidebar } from '@/components/Sidebar'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import { Breadcrumbs } from '@/components/UI/Breadcrumbs'
import { staticBreadcrumbs } from 'utilities/static'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { locale } = useRouter()

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
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
