import { Tour } from '@/API/types'
import { Card } from '@/components/Layout/Card'
import { ListOption } from '@/components/Tour/ListOption'
import { Button } from '@/components/UI/Button'
import { mdiClockTimeThree, mdiMapMarker } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	info?: string
}

export const Info = ({ className }: Props) => {
	return (
		<div className={clsx(className)}>
			<h1 className='text-xl font-semibold mb-2 mt-8'>Алматы</h1>
			<p className='flex mb-3'>
				<Icon size={1} color='#86A545' path={mdiMapMarker} />
				<span className='text-gray text-md '>Казахстан, Алматы</span>
			</p>
			<p className='mb-6'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</p>
			{[1, 2, 3, 4, 5, 6].map((item, index) => (
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
