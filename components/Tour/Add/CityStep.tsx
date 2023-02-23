import { getCities } from '@/API/city.service'
import { Input } from '@/components/UI/Input'
import { mdiFlagVariantOff, mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
// TODO Настроить useDebounce
export const CityStep = () => {
	const { t } = useTranslation()
	const { locale } = useRouter()

	const { data, isLoading, isError } = useQuery(['cities'], () =>
		getCities({ locale: locale as string }),
	)

	if (isLoading) return <>Loading...</>
	if (isError) return <>Error!</>

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>Укажите город</h2>
			<Input
				icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
				placeholder={t('findCity') as string}
			/>
			<div className='scrollbar overflow-y-auto h-[400px] p-[10px] mt-5'>
				{data.map((city, index) => (
					<div key={index} className='text-sm mt-3'>
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

						<span className='block bg-gray h-[0.33px] mt-3' />
					</div>
				))}
			</div>
		</>
	)
}
