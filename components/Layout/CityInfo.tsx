import { components } from '@/API/types/api.types'
import { getWeather } from '@/API/weather.service'
import { getAddedCategories, isDaysEqual } from '@/utilities/utilities'
import {
	mdiCalendarBlank,
	mdiFilter,
	mdiMapMarker,
	mdiMenu,
	mdiSortVariant,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import { enUS } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { FilterSidebar } from '../Common/FilterSidebar'
import NoSSR from '../Common/NoSSR'
import { Sort } from '../Common/Sort'
import { Tag } from '../UI/Tag'
registerLocale('en', enUS)

interface Props {
	city: components['schemas']['City']
}

export const CityInfo = ({ city }: Props) => {
	const { locale, push, query } = useRouter()
	const { t } = useTranslation()
	const [date, setDate] = useState(new Date())
	const { data } = useQuery(['weather', city.name], () => getWeather(city.name))
	const [isOpen, setIsOpen] = useState(false)
	const [isFilter, setIsFilter] = useState(false)
	const [isSort, setIsSort] = useState(false)

	return (
		<>
			<NoSSR>
				<FilterSidebar
					selected={getAddedCategories(query)}
					onClose={() => setIsFilter(false)}
					isVisible={isFilter}
					setFilters={categories => {
						push(
							{
								pathname: `/city/${query['city.id']}`,
								query: {
									...categories.reduce((accumulator, value) => {
										return { ...accumulator, [value.value]: true }
									}, {}),
									...(query.sort && { sort: query.sort }),
								},
							},
							undefined,
							{
								shallow: true,
							},
						)
					}}
				/>
				<Sort
					selected={query._sort as string}
					onClose={() => setIsSort(false)}
					isVisible={isSort}
					set={state => {
						const { _sort, ...rest } = query
						console.log(state)
						push(
							{
								pathname: `/city/${query['city.id']}`,
								query: { ...rest, ...(state && { _sort: state?.value }) },
							},
							undefined,
							{
								shallow: true,
							},
						)
					}}
				/>
			</NoSSR>
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
					<span className='font-semibold text-xl'>
						{data?.data.main.temp ? Math.round(data?.data.main.temp) : '-'}
						&deg;C
					</span>
				</div>
			</div>
			<div className='flex justify-between mt-8'>
				<div className='flex gap-x-3'>
					<Tag
						className='capitalize flex items-center gap-x-2 !py-2'
						isActive={isFilter}
						onClick={() => setIsFilter(prevState => !prevState)}
					>
						<Icon path={mdiFilter} size={0.7} />
						{t('filter')}
					</Tag>
					<Tag
						className='capitalize flex items-center gap-x-2 !py-2'
						isActive={isSort}
						onClick={() => setIsSort(prevState => !prevState)}
					>
						<Icon path={mdiSortVariant} size={0.7} />
						{t('sort')}
					</Tag>
				</div>
				<button
					onClick={() => setIsFilter(prevState => !prevState)}
					className='hidden relative flex items-center border-gray border bg-white rounded-lg px-4 py-2 text-sm font-semibold basis-auto shrink-0'
				>
					<Icon path={mdiMenu} size={1} color='#86A545' className='mr-1' />
					{t('categories')}
				</button>
				<div className='items-center gap-3 hidden'>
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
