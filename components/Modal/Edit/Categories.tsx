import { Button } from '@/components/UI/Button'
import Checkbox from '@/components/UI/Checkbox'
import { Modal } from '@/components/UI/Modal'
import { staticCategories } from '@/utilities/static'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useEditTourStore } from 'store/edit'

interface Props {
  isVisible: boolean
  onClose: () => void
}

export const ChooseCategories = ({ isVisible, onClose }: Props) => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const { tour, editTour } = useEditTourStore()

  const [categories, setCategories] = useState(
    staticCategories.map(category => ({
      id: category.id,
      value: category.value,
      name: category.name,
      checked: tour
        ? !!Object.entries(tour).find(([key, value]) => {
            if (key === category.value) {
              return true
            } else {
              return false
            }
          })?.[1]
        : false,
    })),
  )

  useEffect(() => {
    const transformedObject = categories.reduce(
      (obj: Record<string, boolean>, category) => {
        obj[category.value] = category.checked
        return obj
      },
      {},
    )

    if (tour) {
      editTour({
        ...tour,
        ...transformedObject,
        id: query.id as string,
      })
    }
  }, [categories])

  return (
    <Modal
      className='max-w-lg p-6 max-h-[400px] overflow-y-auto'
      isVisible={isVisible}
      onClose={onClose}
    >
      {categories.map(category => (
        <Fragment key={category.id}>
          <label className='mb-4 flex items-center' key={category.id}>
            <Checkbox
              checked={category.checked}
              onChange={state => {
                setCategories(prevCategories => {
                  return prevCategories.map(prevCategory => {
                    if (prevCategory.id !== category.id) {
                      return prevCategory
                    }
                    return {
                      ...prevCategory,
                      checked: state,
                    }
                  })
                })
              }}
            />
            <span className='ml-3'>{t(category.name)}</span>
          </label>
        </Fragment>
      ))}
      <Button className='outline-none' onClick={onClose}>
        {t('ok')}
      </Button>
    </Modal>
  )
}
