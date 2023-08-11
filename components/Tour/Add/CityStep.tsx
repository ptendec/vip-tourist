import { searchCity } from '@/API/city.service'
import { useDebounce } from '@/hooks/useDebounce'
import { isTourExists } from '@/utilities/utilities'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDraftStore } from 'store/draft'

export const CityStep = () => {
  const { t } = useTranslation()
  const { locale, pathname, query } = useRouter()
  const { addTour, tours, editTour } = useDraftStore()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500)
  const { data, isLoading, isError, refetch } = useQuery(
    ['search', 'city'],
    () =>
      searchCity({
        name: searchTerm,
      }),
  )

  useEffect(() => {
    refetch()
  }, [debouncedSearchTerm])

  const existingTour = isTourExists(query.id as string, tours)

  useEffect(() => {
    if (!existingTour) {
      addTour({
        id: query.id as string,
        name: '',
      })
    }
  }, [query.id])

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error!</>

  return <></>
}
