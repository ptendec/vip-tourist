import { components } from '@/API/types/api.types'
import { getWeather } from '@/API/weather.service'
import { isDaysEqual } from '@/utilities/utilities'
import { mdiCalendarBlank, mdiMapMarker, mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import { enUS } from 'date-fns/locale'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { Tag } from '../UI/Tag'
registerLocale('en', enUS)

interface Props {
	city: components['schemas']['City']
	showFilter: () => void
}

export const CityInfo = ({ city, showFilter }: Props) => {
	const { locale } = useRouter()
	const [date, setDate] = useState(new Date())
	const { data } = useQuery(['weather', city.name], () => getWeather(city.name))
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div className='flex justify-between'>
				<div>
					<h1 className='text-xl font-semibold mb-2'>{city?.name}</h1>
					<p className='flex '>
						<Icon size={1} color='#86A545' path={mdiMapMarker} />
						<span className='text-gray text-md '>
							{`${city.country?.name}, ${city?.name}`}
						</span>
					</p>
				</div>
				<div className='flex items-center'>
					{
						// <Icon
						// 	path={mdiWhiteBalanceSunny}
						// 	className='mr-2'
						// 	size={1}
						// 	color='#FFCE1F'
						// />
					}{' '}
					<span className='font-semibold text-xl'>
						{data?.data.main.temp ? Math.round(data?.data.main.temp) : '-'}
						&deg;C
					</span>
				</div>
			</div>
			<div className='flex justify-between mt-8 '>
				<button
					onClick={showFilter}
					className='relative flex items-center border-gray border bg-white rounded-lg px-4 py-2 text-sm font-semibold basis-auto shrink-0'
				>
					<Icon path={mdiMenu} size={1} color='#86A545' className='mr-1' />
					Категории
				</button>
				<div className='flex items-center gap-3 hidden'>
					<Tag
						isActive={isDaysEqual(date, new Date())}
						onClick={() => {
							setDate(new Date(new Date().toISOString().split('T')[0]))
						}}
					>
						Сегодня
					</Tag>
					<Tag
						isActive={isDaysEqual(
							new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
							date,
						)}
						onClick={() => {
							setDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
						}}
					>
						Завтра
					</Tag>

					<Tag
						isActive={false}
						className='relative'
						onClick={() => setIsOpen(prevState => !prevState)}
					>
						<span className='relative hidden'>
							<DatePicker
								open={isOpen}
								onClickOutside={() => setIsOpen(false)}
								popperPlacement='left'
								className='hidden'
								locale={locale}
								selected={date}
								onChange={date => {
									if (date) setDate(date)
								}}
							/>
						</span>
						<Icon path={mdiCalendarBlank} size={1} />{' '}
					</Tag>
				</div>
			</div>
		</>
	)
}
