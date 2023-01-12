import { components } from '@/API/types/api.types'
import { mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import Image from 'next/image'
import { ArrayElement } from 'utilities/interfaces'

interface Props {
	review: ArrayElement<components['schemas']['Tour']['reviews']>
}

export const Review = ({ review }: Props) => {
	return (
		<div className='flex gap-x-3'>
			<span className='relative h-8 basis-8 shrink-0 inline-block'>
				<Image fill src='/images/demo4.png' alt={''} />
			</span>
			<div className=''>
				<div className='flex'>
					<p className='text-sm font-semibold mr-2'>{review.name}</p>
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
				<span className='text-xs text-gray'>{review.updated_by}</span>
				<p>{review.text}</p>
				<button className='text-green text-xs font-semibold'>Перевести</button>
			</div>
		</div>
	)
}
