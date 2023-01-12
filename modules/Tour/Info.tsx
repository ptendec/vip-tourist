import { components } from '@/API/types/api.types'
import { ListOption } from '@/components/Tour/ListOption'
import { Button } from '@/components/UI/Button'
import { mdiClockTimeThree, mdiMapMarker } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	tour: components['schemas']['Tour']
	country?: components['schemas']['Country']
}
export const Info = ({ className, tour, country }: Props) => {
	return (
		<div className={clsx(className)}>
			<h1 className='text-xl font-semibold mb-2 mt-8'>{tour.name}</h1>
			<p className='flex mb-3'>
				<Icon size={1} color='#86A545' path={mdiMapMarker} />
				<span className='text-gray text-md '>
					{country?.name}, {tour.city?.name}
				</span>
			</p>
			<p className='mb-6'>{tour.description}</p>
			{[1, 2, 3, 4, 5, 6].map(item => (
				<ListOption
					key={item}
					icon={mdiClockTimeThree}
					title='Продолжительность'
					description='4 часа'
				/>
			))}
			<Button className='mt-6'>Купить сейчас</Button>
		</div>
	)
}
