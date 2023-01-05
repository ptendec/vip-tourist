import { mdiMapMarker, mdiMenu, mdiWhiteBalanceSunny } from '@mdi/js'
import Icon from '@mdi/react'
import { useState } from 'react'
import { FilterSidebar } from '../FilterSidebar'
import { mdiCalendarBlank } from '@mdi/js'

export const CityInfo = () => {
	const [isCategories, setIsCategories] = useState(false)

	return (
		<>
			<FilterSidebar
				onClose={() => setIsCategories(false)}
				isVisible={isCategories}
			/>
			<div className='flex justify-between'>
				<div>
					<h1 className='text-xl font-semibold mb-2'>Алматы</h1>
					<p className='flex '>
						<Icon size={1} color='#86A545' path={mdiMapMarker} />
						<span className='text-gray text-md '>Казахстан, Алматы</span>
					</p>
				</div>
				<div className='flex items-center'>
					<Icon
						path={mdiWhiteBalanceSunny}
						className='mr-2'
						size={1}
						color='#FFCE1F'
					/>
					<span className='font-semibold text-xl'>23&deg;C</span>
				</div>
			</div>
			<div className='flex justify-between mt-8'>
				<button
					onClick={() => setIsCategories(prevState => !prevState)}
					className='relative flex items-center border-gray border bg-white rounded-lg px-4 py-2 text-sm font-semibold basis-auto shrink-0'
				>
					<Icon path={mdiMenu} size={1} color='#86A545' className='mr-1' />
					Категории
				</button>
				<div className='flex items-center gap-3'>
					<button className='rounded-full py-3 px-4 border border-lightGray text-sm font-semibold'>
						Сегодня
					</button>
					<button className='rounded-full py-3 px-4 border border-lightGray text-sm font-semibold'>
						Завтра
					</button>
					<button className='rounded-full py-2 h-[46px] px-8 border border-lightGray text-sm font-semibold'>
						<Icon path={mdiCalendarBlank} size={1} />{' '}
					</button>
				</div>
			</div>
		</>
	)
}
