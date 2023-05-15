import { components } from '@/API/types/api.types'
import { Button } from '@/components/UI/Button'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface Props {
  tour: components['schemas']['Tour']
}

export const SendToVerification = ({ tour }: Props) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const formedImages = tour?.image_urls?.split('|')

  return (
    <div className='flex flex-col items-center justify-center relative py-10 my-auto'>
      <div className='h-[220px] w-full flex flex-col items-center'>
        <div className='bg-[#F1F3EC] w-[220px] h-[220px] rounded-full absolute mx-auto block'></div>
        <div className='text-sm flex w-[315px] bg-white p-[10px] rounded-lg relative z-10 shadow-lg mt-10'>
          <span className='relative inline-block basis-20 h-20 shrink-0 '>
            <span className='top-2 absolute z-20 left-2 rounded-lg bg-yellow py-[3px] leading-tight inline-block px-1.5 font-bold text-[10px]'>
              $ {tour?.adult_price}
            </span>
            <Image
              className='rounded-lg'
              src={tour?.mainPhotoUrl ?? ''}
              alt='Tour image'
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </span>
          <div className='ml-[10px]'>
            <p className='font-semibold '>{tour?.name}</p>
            <span className='text-gray limit'>{tour?.description}</span>
          </div>
        </div>
      </div>

      <div className='relative z-20 text-center'>
        <p className='text-lg mt-10 text-center font-bold'>
          {t('tourSendTag1')}
        </p>
        <span className='text-lightDark mb-8 inline-block'>
          {t('tourSendTag2')}
        </span>
        <Button
          className='w-8/12 mx-auto'
          onClick={() => {
            push('/guide/accout/')
          }}
        >
          {t('goToOffers')}
        </Button>
      </div>
    </div>
  )
}
