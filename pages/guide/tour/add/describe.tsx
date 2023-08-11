import NoSSR from '@/components/Common/NoSSR'
import { ChooseCategories } from '@/components/Modal/Categories'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { MultiSelect } from '@/components/UI/MultiSelect'
import { Textarea } from '@/components/UI/Textarea'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { DescribeFields, ListItem } from '@/utilities/interfaces'
import { langList } from '@/utilities/static'
import {
  getAddedCategories,
  getAddedLanguages,
  getNotAddedCategories,
} from '@/utilities/utilities'
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
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm<DescribeFields>()
  const { t } = useTranslation()
  const { user } = useFirebaseAuth()
  const { pathname, query, push } = useRouter()
  const { addTour, tours, removeTour, editTour } = useDraftStore()

  const [existingTour, setExistingTour] = useState<Tour | undefined>(
    tours.find(tour => tour.id === (query.id as string)),
  )

  const [isCategories, setIsCategories] = useState(false)

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
    setValue('name', existingTour?.name ?? '')
    setValue('description', existingTour?.description ?? '')
    setValue('duration', existingTour?.duration ?? '')
    existingTour?.placesCount && setValue('seats', existingTour?.placesCount)

    if (existingTour?.name) {
      trigger('name')
    }
    if (existingTour?.description) {
      trigger('description')
    }
    if (existingTour?.duration) {
      trigger('duration')
    }
    if (existingTour?.placesCount) {
      trigger('seats')
    }
  }, [])

  const onSubmit = (data: DescribeFields) => {
    if (!existingTour) return
    if (getAddedCategories(existingTour).length === 0)
      return toast.error(t('selectCategories'))
    if (getAddedLanguages(existingTour.languages)?.length === 0) {
      return toast.error(t('chooseLanguages'))
    }
    editTour(query.id as string, {
      ...existingTour,
      id: query.id as string,
      name: data.name,
      description: data.description,
      duration: data.duration,
      placesCount: data.seats,
    })
    push(`city?id=${query.id}`)
  }

  return (
    <>
      <Head>
        <title>{`${t('tour')} | VipTourist`}</title>
      </Head>
      <NoSSR>
        <ChooseCategories
          isVisible={isCategories}
          onClose={() => setIsCategories(false)}
        />
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
                  {t('describeUrTour')}
                </h2>
                <div>
                  <Input
                    className='mb-5'
                    label='Название'
                    placeholder={t('enterTourName') as string}
                    {...register('name', {
                      required: `${t('fieldShouldntBe')}`,
                    })}
                    error={errors.name?.message}
                  />
                  <Textarea
                    rows={4}
                    label={t('desc') as string}
                    className='mb-5 h-10'
                    placeholder={t('desc') as string}
                    {...register('description', {
                      required: `${t('fieldShouldntBe')}`,
                    })}
                    error={errors.description?.message}
                  />
                  <Button
                    type='button'
                    onClick={() => setIsCategories(true)}
                    className='my-2'
                  >
                    {t('selectCategories')}
                  </Button>
                  <span
                    key={JSON.stringify(existingTour)}
                    className='capitalize text-xs font-medium'
                  >
                    {getAddedCategories(existingTour)
                      .map(category => t(category.name))
                      .join(', ')}
                  </span>
                  <div className='flex justify-between mt-5'>
                    <Input
                      label='Длительность, ч *'
                      placeholder='4'
                      className='basis-[calc(50%_-_8px)]'
                      {...register('duration', {
                        required: `${t('fieldShouldntBe')}`,
                      })}
                      error={errors.duration?.message}
                    />
                    <Input
                      label={t('seatsAvailable')}
                      placeholder='17'
                      className='basis-[calc(50%_-_8px)]'
                      {...register('seats', {
                        required: `${t('fieldShouldntBe')}`,
                      })}
                      error={errors.seats?.message}
                    />
                  </div>
                  <MultiSelect
                    chosenItems={getAddedLanguages(existingTour?.languages)}
                    className='mt-2'
                    list={langList}
                    onChange={(items: ListItem[]) => {
                      editTour(query.id as string, {
                        languages: items.map(items => items.name).join('|'),
                        id: query.id as string,
                      })
                    }}
                    label={t('chooseLanguages')}
                  />
                  <span
                    key={JSON.stringify(existingTour?.languages)}
                    className='capitalize text-xs font-medium'
                  >
                    {existingTour?.languages &&
                      existingTour?.languages
                        ?.split('|')
                        .map(text => t(text))
                        .join(', ')}
                  </span>
                </div>
              </div>
              <div
                className={clsx(
                  'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
                )}
              >
                <Button
                  disabled={pathname.includes('describe')}
                  className='w-max px-10 sm:px-3'
                >
                  {t('back')}
                </Button>
                <span className='block mx-auto font-bold text-sm uppercase'>
                  {t('step')} 1 {t('izz')} 6
                </span>
                <Button
                  onClick={() => {
                    if (
                      !isValid ||
                      getAddedLanguages(existingTour?.languages).length === 0 ||
                      getAddedCategories(existingTour).length === 0
                    )
                      return
                    push(
                      {
                        pathname: 'city',
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
