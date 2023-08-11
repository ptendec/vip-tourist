import { components } from '@/API/types/api.types'
import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { Popover, Transition } from '@headlessui/react'
import {
  mdiAccountMultiple,
  mdiCalendarBlank,
  mdiChevronRight,
  mdiEarth,
  mdiHiking,
  mdiMinus,
  mdiPlus,
} from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Fragment, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { ListOption } from '../Tour/ListOption'

interface Props {
  isVisible: boolean
  onClose: () => void
  tour: components['schemas']['Tour']
}
// TODO: Привести в порядок даты

export const Buy = ({ isVisible, onClose, tour }: Props) => {
  const { t } = useTranslation()
  const [error, setError] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  useEffect(() => {
    console.log(tour.adult_price)
    console.log(children * (tour?.child_price ?? 1))
    console.log(
      (tour.adult_price ?? 1) * adults + (tour.child_price ?? 1) * children,
    )
  }, [adults, children])

  return (
    <>
      <Modal className='max-w-md p-6' isVisible={isVisible} onClose={onClose}>
        <p className='font-semibold text-xl text-center mb-5'>{t('billing')}</p>
        <ListOption
          icon={mdiEarth}
          title={t('Название тура')}
          description={tour.name}
        />
        <ListOption
          icon={mdiHiking}
          title={t('guide')}
          description={tour.profile?.name}
        />
        {tour.date && (
          <ListOption
            icon={mdiCalendarBlank}
            title={t('dateAndTime')}
            description={new Date(tour.date).toISOString().split('T')[0]}
          />
        )}

        <Popover className='relative'>
          {({ open }) => {
            return (
              <>
                <Popover.Button className='flex justify-between items-center w-full '>
                  <ListOption
                    icon={mdiAccountMultiple}
                    title={t('numberOfPpl')}
                    description={`x${adults} ${t('adults')}, x${children} ${t(
                      'children',
                    )}`}
                  />
                  <Icon
                    path={mdiChevronRight}
                    className={clsx(
                      open && 'rotate-90 ',
                      'transition-all duration-300 ease-out',
                    )}
                    size={1.3}
                    color='#BFBFBF'
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  <Popover.Panel className='absolute w-full bg-white rounded-lg p-6 shadow-lg'>
                    <div className='flex justify-between items-center'>
                      <p className='text-sm font-semibold'>
                        {t('adults')}
                        <span className='text-gray text-[10px] leading-normal block'>
                          {t('from18yo')}
                        </span>
                      </p>
                      <div className='flex gap-x-4'>
                        <Button
                          className='shrink-0 !rounded-full !w-6 !h-6'
                          disabled={adults === 1}
                          onClick={() => setAdults(prevValue => --prevValue)}
                        >
                          <Icon path={mdiMinus} size={0.7} />
                        </Button>
                        {adults}
                        <Button
                          className='shrink-0 !rounded-full !w-6 !h-6 '
                          disabled={adults === 10}
                          onClick={() => setAdults(prevValue => ++prevValue)}
                        >
                          <Icon path={mdiPlus} size={0.7} />
                        </Button>
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                      <p className='text-sm font-semibold'>
                        {t('adults')}
                        <span className='text-gray text-[10px] leading-normal block'>
                          {t('from18yo')}
                        </span>
                      </p>
                      <div className='flex gap-x-4'>
                        <Button
                          className='shrink-0 !rounded-full !w-6 !h-6'
                          disabled={children === 0}
                          onClick={() => setChildren(prevValue => --prevValue)}
                        >
                          <Icon path={mdiMinus} size={0.7} />
                        </Button>
                        {children}
                        <Button
                          className='shrink-0 !rounded-full !w-6 !h-6'
                          disabled={children === 10}
                          onClick={() => setChildren(prevValue => ++prevValue)}
                        >
                          <Icon path={mdiPlus} size={0.7} />
                        </Button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )
          }}
        </Popover>
        <p className='flex justify-between mt-5 mb-1'>
          <span className='font-semibold'>К оплате:</span>
          <span className='font-bold'>
            ${' '}
            {(tour.adult_price ?? 1) * adults +
              (tour.child_price ?? 1) * children}
          </span>
        </p>
        <span className='text-[10px] leading-normal text-lightDark inline-block'>
          {t('overall')}
        </span>
        <Button
          id='purchase'
          className='outline-none mt-6'
          onClick={() => {
            setError(true)
          }}
        >
          {t('next')}
        </Button>
        {error && (
          <>
            <span className='text-[10px] leading-tight inline-block text-red mt-2'>
              {t('freshTag1')}
            </span>
            <span className='mb-2 text-[10px] leading-tight inline-block text-red'>
              {t('freshTag2')}
            </span>
          </>
        )}

        <span className='text-lightDark text-[10px] leading-tight inline-block mt-2.5'>
          {t('billingTag')}
        </span>
      </Modal>
      <Tooltip
        anchorId='purchase'
        content='Покупка временно недоступна'
        place='top'
        className='z-30'
        noArrow
        delayShow={200}
      />
    </>
  )
}
