import { Button } from '@/components/UI/Button'
import { mdiMessageImage, mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/router'

export const NoOrders = () => {
	const { push } = useRouter()

	return (
		<div className='mx-auto my-auto w-80'>
			<div className='border rounded-lg border-lightGray p-5 animate-pulse'>
				<Icon
					className='mx-auto block mb-5'
					color='#BFBFBF'
					path={mdiMessageImage}
					size={2.5}
				/>
				<div className='w-full h-3 bg-gray rounded-full' />
				<div className='flex mt-2.5 gap-x-2.5'>
					<div className='basis-5/12 h-3 bg-lightGray rounded-full' />
					<div className='basis-7/12 h-3 bg-lightGray rounded-full' />
				</div>
				<span className='flex flex-row gap-[2px] mt-4'>
					{[1, 2, 3, 4, 5].map(element => (
						<Icon key={element} path={mdiStar} size={0.7} color='#FFCE1F' />
					))}
				</span>
			</div>
			<p className='text-lg mt-12 text-center mb-8'>
				На данный момент у вас нет приобретенных билетов
			</p>
			<Button
				className='w-8/12 mx-auto'
				onClick={() => {
					push('/')
				}}
			>
				Подобрать экскурсии
			</Button>
		</div>
	)
}
