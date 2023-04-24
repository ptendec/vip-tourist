import { getTour } from '@/API/tour.service'
import NoSSR from '@/components/Common/NoSSR'
import { SendToVerification } from '@/components/Common/SentToVerification'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { ReactElement } from 'react'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale, query } = useRouter()
	const {
		data: tour,
		isLoading,
		isError,
	} = useQuery(['tour', query?.id], () =>
		getTour({ locale: locale as string, id: query.id as string }),
	)

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error</>

	return (
		<>
			<Head>
				<title>{`${t('tour')} | VipTourist`}</title>
			</Head>
			<NoSSR>
				<Wrapper>
					<Container className='pt-10 flex flex-col mx-auto'>
						<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
							<SendToVerification tour={tour} />
						</div>
					</Container>
				</Wrapper>
			</NoSSR>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
