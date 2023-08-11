import { translate } from '@/API/translate.service'
import { components } from '@/API/types/api.types'
import { mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ArrayElement } from 'utilities/interfaces'
import { useTranslation } from 'next-i18next'
interface Props {
  review: ArrayElement<components['schemas']['Tour']['reviews']>
}

export const Review = ({ review }: Props) => {
  const { locale } = useRouter()
  const [isTranslate, setIsTranslate] = useState(false)
  const [translated, setTranslated] = useState<string>()
  const { t } = useTranslation()

  useEffect(() => {
    if (isTranslate) {
      translate(locale as string, review.text ?? '')
        .then(response => {
          console.log(response)
          setTranslated(response[1].data.translations[0].translatedText)
        })
        .catch(error => {
          setTranslated(t('somethingWentWrong') ?? '')
        })
    }
  }, [isTranslate])

  return (
    <div className='flex gap-x-3 my-3'>
      <span className='relative h-8 basis-8 shrink-0 inline-block'>
        <Image
          width={32}
          height={32}
          className='rounded-full'
          src={
            review.photo_url ??
            `https://ui-avatars.com/api/?name=${review.name}&size=32&font-size=0.55&rounded=true&background=ededed&color=86A545&format=svg`
          }
          alt={''}
        />
      </span>
      <div className=''>
        <div className='flex'>
          <p className='text-sm font-semibold mr-2'>{review.name}</p>
          <div className='flex translate-x-1'>
            {[1, 2, 3, 4, 5].map(item => (
              <Icon
                className=''
                key={item}
                path={mdiStar}
                size={0.7}
                color='#FFCE1F'
              />
            ))}
          </div>
        </div>
        <span className='text-xs text-gray'>
          {typeof review.updated_by === 'string' &&
            new Date(review.updated_by).toISOString().split('T')[0]}
        </span>
        <p>{isTranslate && translated ? translated : review.text}</p>
        <button
          className='text-green text-xs font-semibold'
          onClick={() => setIsTranslate(prevValue => !prevValue)}
        >
          Перевести
        </button>
      </div>
    </div>
  )
}
