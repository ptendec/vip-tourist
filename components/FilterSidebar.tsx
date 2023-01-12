import clsx from 'clsx'
import Checkbox from '@/components/UI/Checkbox'
import { Fragment, useState } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import { staticCategories } from 'utilities/static'
import { Button } from './UI/Button'

interface Props {
	isVisible: boolean
	onClose: () => void
}

export const FilterSidebar = ({ isVisible, onClose }: Props) => {
	const [categories, setCategories] = useState(
		staticCategories.map(category => ({
			id: category.id,
			value: category.value,
			checked: false,
		})),
	)
	return (
		<div
			className={clsx(
				'fixed overflow-y-scroll scrollbar transition-all duration-500 ease-out h-screen right-0 top-0 bg-white p-8 z-10 w-[400px]',
				isVisible ? '' : '-right-[400px] overflow-y-scroll',
			)}
		>
			<div className='flex flex-row justify-between mb-8'>
				<p className='text-xl font-semibold '>Категории</p>
				<button onClick={onClose} className=''>
					<Icon path={mdiClose} size={1} color='#3B3F32' />
				</button>
			</div>
			{categories.map(category => (
				<Fragment key={category.id}>
					<label className='mb-4 flex items-center' key={category.id}>
						<Checkbox
							checked={category.checked}
							onChange={state => {
								setCategories(prevCategories => {
									return prevCategories.map(prevCategory => {
										if (prevCategory.id !== category.id) {
											return prevCategory
										}
										return {
											...prevCategory,
											checked: state,
										}
									})
								})
							}}
						/>
						<span className='ml-3'>{category.value}</span>
					</label>
				</Fragment>
			))}
			<Button className='py-2'>Применить</Button>
		</div>
	)
}
