import { searchCity } from '@/API/city.service'
import { Input } from '@/components/UI/Input'
import { useDebounce } from '@/hooks/useDebounce'
import { isTourExists } from '@/utilities/utilities'
import { mdiFlagVariantOff, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
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

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>Укажите город</h2>
			<Input
				onChange={event => setSearchTerm(event.currentTarget.value)}
				icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
				placeholder={t('findCity') as string}
			/>

			<div className='scrollbar overflow-y-auto h-[400px] p-[10px] mt-5'>
				{data.map((city, index) => (
					<Fragment key={city.id}>
						<div
							key={index}
							className={clsx(
								'text-sm p-3 rounded-lg hover:bg-[#F6F6F5] cursor-pointer transition-all duration-300 ease-out',
								existingTour?.city === city.id && 'bg-[#F6F6F5] font-semibold',
							)}
							onClick={() =>
								editTour(query.id as string, {
									id: query.id as string,
									city: city.id,
								})
							}
						>
							<div className='flex items-center gap-x-3'>
								{/* @ts-expect-error Типы */}
								{city.country?.flag.url ? (
									<Image
										className='rounded-sm'
										//@ts-expect-error Типы
										src={`${process.env.NEXT_PUBLIC_API_URL}${city.country?.flag.url}`}
										width={22.67}
										height={17}
										alt='flag'
									/>
								) : (
									<Icon path={mdiFlagVariantOff} size={1} />
								)}
								{city.name}
							</div>
						</div>
						<span className='block bg-gray h-[0.33px]' />
					</Fragment>
				))}
			</div>
		</>
	)
}
