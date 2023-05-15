import { searchCity } from '@/API/city.service'
import { searchTour } from '@/API/tour.service'
import { Container } from '@/components/UI/Container'
import { Cards } from '@/modules/Cards'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { Search } from '@/modules/Search'
import { Towns } from '@/modules/Towns'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { json } from 'utilities/utilities'

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['tours'], () =>
    searchCity({
      locale: context.locale as string,
      name: context.query.text as string,
    }),
  )
  await queryClient.prefetchQuery(['cities'], () =>
    searchTour({
      locale: context.locale as string,
      name: context.query.text as string,
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
    data: tours,
    isLoading: isToursLoading,
    isError: isToursError,
  } = useQuery(['tours', query.text], () =>
    searchTour({ locale: locale as string, name: query.text as string }),
  )

  const {
    data: cities,
    isLoading: isCitiesLoading,
    isError: isCitiesError,
  } = useQuery(['search', 'cities', query.text], () =>
    searchCity({ locale: locale as string, name: query.text as string }),
  )

  if (isCitiesLoading || isToursLoading) return <>Loading...</>
  if (isToursError || isCitiesError) return <>Error!</>

  return (
    <>
      <Head>
        <title>{`${query.text} | VipTourist`}</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 flex flex-col mx-auto xs:pt-0'>
          <Search />
          {tours.length ? (
            <p>{t('noSuggestions')}</p>
          ) : (
            <Cards title={t('tours')} tours={tours} />
          )}
          {cities.length ? (
            <p>{t('noSuggestions')}</p>
          ) : (
            <Towns cities={cities}></Towns>
          )}
        </Container>
      </Wrapper>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
