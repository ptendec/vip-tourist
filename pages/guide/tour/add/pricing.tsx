import NoSSR from '@/components/Common/NoSSR'
import { Button } from '@/components/UI/Button'
import Checkbox from '@/components/UI/Checkbox'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Popover } from '@/components/UI/Popover'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { PricingFields } from '@/utilities/interfaces'
import { calcComission, getNotAddedCategories } from '@/utilities/utilities'
import { mdiAccount, mdiBabyFaceOutline, mdiInformation } from '@mdi/js'
import Icon from '@mdi/react'
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
    watch,
    formState: { errors, isValid },
  } = useForm<PricingFields>()
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

  const onSubmit = (data: PricingFields) => {
    editTour(query.id as string, {
      ...existingTour,
      child_price: data.childPrice ?? data.adultPrice,
      adult_price: data.adultPrice,
      id: query.id as string,
    })
  }

  useEffect(() => {
    if (existingTour) {
      existingTour.adult_price &&
        setValue('adultPrice', existingTour.adult_price)
      existingTour.child_price &&
        setValue('childPrice', existingTour.child_price)
    }
    if (existingTour?.adult_price) trigger('adultPrice')
    if (existingTour?.child_price) trigger('childPrice')
  }, [])

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
            <div className={clsx('flex justify-between ')}>
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
            <form
              className='h-full flex flex-col justify-between'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='w-5/12 my-12 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full '>
                <h2 className='font-semibold text-center block mb-5'>
                  {t('ticketPrice')}
                </h2>
                <p className='text-sm mb-5'>{t('usdTag')}</p>
                <div className=''>
                  <Popover
                    className='absolute right-0 top-1'
                    head={
                      <div className=''>
                        <button className=''>
                          <Icon
                            path={mdiInformation}
                            size={0.8}
                            className='text-yellow'
                          />
                        </button>
                      </div>
                    }
                    body={
                      <span className='text-sm w-[200px] z-50 bottom-0 relative shadow-lg p-2 rounded-lg block'>
                        {t('commission1')} <br />
                        {t('commission2')} <br />
                        {t('commission3')} <br />
                        {t('commission4')} <br />
                        {t('commission5')} <br />
                        {t('commission6')} <br />
                      </span>
                    }
                  />
                  <div className='flex justify-between mt-3'>
                    <Input
                      icon={<Icon path={mdiAccount} size={1} />}
                      label={t('adultPrice')}
                      placeholder='129'
                      className='basis-[calc(50%_-_8px)]'
                      type='number'
                      {...register('adultPrice', {
                        required: `${t('fieldShouldntBe')}`,
                      })}
                      error={errors.adultPrice?.message}
                    />
                    <Input
                      icon={<Icon path={mdiAccount} size={1} />}
                      readOnly={true}
                      value={calcComission(Number(watch('adultPrice')))}
                      label={t('withComission')}
                      placeholder='129'
                      className='basis-[calc(50%_-_8px)]'
                      type='number'
                    />
                  </div>
                  <div className='flex justify-between mt-3 mb-5'>
                    <Input
                      type='number'
                      icon={<Icon path={mdiBabyFaceOutline} size={1} />}
                      label={t('childPrice')}
                      placeholder='23'
                      className='basis-[calc(50%_-_8px)]'
                      {...register('childPrice')}
                      error={errors.childPrice?.message}
                    />
                    <Input
                      icon={<Icon path={mdiAccount} size={1} />}
                      readOnly={true}
                      value={calcComission(Number(watch('childPrice')))}
                      label={t('withComission')}
                      placeholder='129'
                      className='basis-[calc(50%_-_8px)]'
                      type='number'
                    />
                  </div>
                  <span className='block bg-gray h-[0.33px]' />
                  <label className='flex justify-between items-center text-sm font-semibold my-4'>
                    {
                      // ПЕРЕВЕСТИ
                    }
                    {t('Трансфер включен в стоимость')}
                    <Checkbox
                      checked={existingTour?.withTransfer ?? false}
                      onChange={event => {
                        editTour(query.id as string, {
                          withTransfer: !existingTour?.withTransfer,
                          id: query.id as string,
                        })
                      }}
                    />
                  </label>
                  <span className='block bg-gray h-[0.33px]' />
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
                    if (!isValid) return
                    push(
                      {
                        pathname: 'additional',
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
                  {t('step')} 4 {t('izz')} 6
                </span>
                <Button
                  type='submit'
                  onClick={() => {
                    if (!isValid) return
                    push(
                      {
                        pathname: 'image',
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
