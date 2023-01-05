import { FilterSidebar } from '@/components/FilterSidebar'
import { Input } from '@/components/UI/Input'
import Icon from '@mdi/react'
import Image from 'next/image'
import { useState } from 'react'
import { mdiMenu } from '@mdi/js'
export const Search = () => {
	const [isCategories, setIsCategories] = useState(false)
	return (
		<>
			<FilterSidebar
				onClose={() => setIsCategories(false)}
				isVisible={isCategories}
			/>
			<div className='w-full'>
				<span className='relative h-40 w-full inline-block'>
					<Image fill src='/images/demo.png' alt={''}></Image>
				</span>
				<div className='mt-8 flex flex-row gap-3 '>
					<Input
						className='basis-full'
						icon='/images/search.svg'
						placeholder='Найти город или тур'
					></Input>
					<button
						onClick={() => setIsCategories(prevState => !prevState)}
						className='relative flex items-center border-gray border bg-white rounded-lg px-4 basis-auto shrink-0 text-sm font-semibold'
					>
						<Icon path={mdiMenu} size={1} color='#86A545' className='mr-1' />
						Категории
					</button>
				</div>
			</div>
		</>
	)
}
