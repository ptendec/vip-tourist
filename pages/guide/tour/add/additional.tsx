import NoSSR from '@/components/Common/NoSSR'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Textarea } from '@/components/UI/Textarea'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { AdditionalFields } from '@/utilities/interfaces'
import { getNotAddedCategories } from '@/utilities/utilities'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { Tour, useDraftStore } from 'store/draft'

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ['common'])),
    },
  }
}

const Main = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<AdditionalFields>()
  const { t } = useTranslation()
  const { user } = useFirebaseAuth()
  const { query, push } = useRouter()
  const { addTour, tours, removeTour, editTour } = useDraftStore()

  const [existingTour, setExistingTour] = useState<Tour | undefined>(
    tours.find(tour => tour.id === (query.id as string)),
  )

  useEffect(() => {
    if (!existingTour) {
      addTour({
        id: query.id as string,
        name: '',
      })
    }
  }, [query.id])

  useEffect(() => {
    if (!existingTour) {
      addTour({
        id: query.id as string,
        profile: user?.uid,
      })
    }
  }, [query.id])

  useEffect(() => {
    setExistingTour(tours.find(tour => tour.id === (query.id as string)))
  }, [tours.find(tour => tour.id === (query.id as string))])

  useEffect(() => {
    if (existingTour)
      editTour(query.id as string, {
        ...existingTour,
        ...getNotAddedCategories(existingTour),
        id: query.id as string,
      })
  }, [])

  useEffect(() => {
    setValue('prerequisites', existingTour?.prerequisites)
    setValue('included', existingTour?.included)
    setValue('not_included', existingTour?.not_included)
    setValue('prohibitions', existingTour?.prohibitions)
    setValue('note', existingTour?.note)

    if (existingTour?.prerequisites) trigger('prerequisites')
    if (existingTour?.included) trigger('included')
    if (existingTour?.not_included) trigger('not_included')
    if (existingTour?.prohibitions) trigger('prohibitions')
    if (existingTour?.note) trigger('note')
  }, [])

  const onSubmit = (data: AdditionalFields) => {
    editTour(query.id as string, {
      ...existingTour,
      ...data,
      id: query.id as string,
    })
  }

  return (
    <>
      <Head>
        <title>{`${t('tour')} | VipTourist`}</title>
      </Head>
      <NoSSR>
        <Tooltip
          noArrow
          delayShow={200}
          content='Сохранить на время'
          anchorSelect='save'
          place='bottom'
        />
        <Wrapper>
          <Container className='justify-self-center pt-10 flex flex-col mx-auto min-h-screen'>
            <div className={clsx('flex justify-between')}>
              <h1 className='font-semibold text-lg'>{t('addTour')}</h1>
              <div className='flex gap-x-4'>
                <Button
                  className='!bg-[#D84343] text-white h-8 px-3'
                  onClick={() => {
                    toast.success('Черновик удален')
                    removeTour(query.id as string)
                    push('/guide/account', undefined, { shallow: true })
                  }}
                >
                  {t('cancel')}
                </Button>
                <Button
                  id='save'
                  className='px-3 h-8'
                  onClick={() => {
                    toast.success('Изменения сохранены')
                    push('/guide/account', undefined, { shallow: true })
                  }}
                >
                  {t('save')}
                </Button>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
                <h2 className='font-semibold text-center block mb-5'>
                  {t('additional')}
                </h2>
                <div>
                  <Textarea
                    rows={4}
                    className='mb-5'
                    label={t('prerequisites') ?? ''}
                    placeholder={t('prerequisitesNew') as string}
                    {...register('prerequisites')}
                    error={errors.prerequisites?.message}
                  />
                  <Textarea
                    rows={4}
                    label={t('enterIncludedNew') as string}
                    className='mb-5'
                    placeholder={
                      t('Например, стаканы и холодная вода') as string
                    }
                    {...register('included')}
                    error={errors.included?.message}
                  />
                  <Textarea
                    rows={4}
                    label={t('enterNotIncludedNew') as string}
                    className='mb-5'
                    placeholder={t('Например, трансфер') as string}
                    {...register('not_included')}
                  />
                  <Textarea
                    rows={4}
                    label={t('prohibs') as string}
                    className='mb-5'
                    placeholder={t('Например, алкоголь и курение  ') as string}
                    {...register('prohibitions')}
                    error={errors.prohibitions?.message}
                  />
                  <Textarea
                    rows={4}
                    label={t('notesAboutFreeTour') as string}
                    className='mb-5'
                    defaultValue={existingTour?.note}
                    placeholder={t('Любая дополнительная информация') as string}
                    {...register('note')}
                    error={errors.note?.message}
                  />
                </div>
              </div>
              <div
                className={clsx(
                  'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
                )}
              >
                <Button
                  className='w-max px-10 sm:px-3'
                  type='button'
                  onClick={() => {
                    push(
                      {
                        pathname: 'city',
                        query: { id: query.id },
                      },
                      undefined,
                      { shallow: true },
                    )
                  }}
                >
                  {t('back')}
                </Button>
                <span className='block mx-auto font-bold text-sm uppercase'>
                  {t('step')} 3 {t('izz')} {6}
                </span>
                <Button
                  type='submit'
                  onClick={() => {
                    if (!isValid) return
                    push(
                      {
                        pathname: 'pricing',
                        query: { id: query.id },
                      },
                      undefined,
                      { shallow: true },
                    )
                  }}
                  className='w-max px-10 truncate sm:px-3'
                >
                  {t('next')}
                </Button>
              </div>
            </form>
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
