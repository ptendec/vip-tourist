import { getCities } from '@/API/city.service'
import { mdiFlagVariantOff } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useEditTourStore } from 'store/edit'

export const CityStep = () => {
	const { locale, pathname, query } = useRouter()
	const { tour, editTour } = useEditTourStore()

	const { data, isLoading, isError } = useQuery(['cities'], () =>
		getCities({ locale: locale as string }),
	)

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>Укажите город</h2>
			{
				// <Input
				// icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
				// placeholder={t('findCity') as string}
				// />
				//
			}{' '}
			<div className='scrollbar overflow-y-auto h-[400px] p-[10px] mt-5'>
				{data.map((city, index) => (
					<Fragment key={city.id}>
						<div
							key={index}
							className={clsx(
								'text-sm p-3 rounded-lg hover:bg-[#F6F6F5] cursor-pointer transition-all duration-300 ease-out',
								tour?.city == city.id ||
									tour?.city ==
										city.localizations?.find(
											_locale => _locale.id === tour?.city,
										)?.id
									? 'bg-[#F6F6F5] font-semibold'
									: null,
							)}
							onClick={() =>
								editTour({
									id: query.id as string,
									...tour,
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
