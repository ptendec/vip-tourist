import { mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import Image from 'next/image'

interface Props {
	a?: string
}

export const Review = ({ a }: Props) => {
	return (
		<div className='flex gap-x-3'>
			<span className='relative h-8 basis-8 shrink-0 inline-block'>
				<Image fill src='/images/demo4.png' alt={''} />
			</span>
			<div className=''>
				<div className='flex'>
					<p className='text-sm font-semibold mr-2'>Имя Фамилия</p>
					<div className='flex translate-x-1'>
						{[1, 2, 3, 4, 5].map(item => (
							<Icon
								className=''
								key={item}
								path={mdiStar}
								size={0.7}
								color='#FFCE1F'
							/>
						))}
					</div>
				</div>
				<span className='text-xs text-gray'>23.01.2021</span>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</p>
				<button className='text-green text-xs font-semibold'>Перевести</button>
			</div>
		</div>
	)
}
