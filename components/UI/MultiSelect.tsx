import { ListItem } from '@/utilities/interfaces'
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

interface Props extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
	list: ListItem[]
	chosenItems?: ListItem[]
	onChange: (item: ListItem[]) => void
	label: string
}

export const MultiSelect = ({
	list,
	onChange,
	label,
	chosenItems = [],
	className,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedItems, setSelectedItems] = useState<ListItem[]>(chosenItems)

	useEffect(() => {
		onChange(selectedItems)
	}, [selectedItems])

	function isSelected(item: ListItem) {
		return Boolean(
			selectedItems.find((element: ListItem) => element.id === item.id),
		)
	}

	function handleSelect(item: ListItem) {
		if (!isSelected(item)) {
			const selectedItemsUpdated = [
				...selectedItems,
				list.find((element: ListItem) => element.id === item.id),
			]
			setSelectedItems(selectedItemsUpdated as ListItem[])
		} else {
			handleDeselect(item)
		}
	}

	function handleDeselect(item: ListItem) {
		const selectedItemsUpdated = selectedItems.filter(
			(element: ListItem) => element.id !== item.id,
		)
		setSelectedItems(selectedItemsUpdated)
	}

	return (
		<div className={clsx(className, 'w-full')}>
			<Listbox
				as='div'
				value={selectedItems}
				// @ts-expect-error Несответствие типов
				onChange={(element: ListItem) => handleSelect(element)}
				open={isOpen}
				className='relative'
			>
				{() => (
					<>
						<Listbox.Label className='font-medium mb-1 inline-block'>
							{label}
						</Listbox.Label>
						<Listbox.Button
							className='flex py-2 px-7 gap-x-3 hover:bg-[#F6F6F5] rounded-lg transition-all duration-300 ease-out w-full text-elipsis'
							onClick={() => setIsOpen(!isOpen)}
						>
							<span className='truncate'>
								{selectedItems.length === 0
									? 'Выберите '
									: `Выбрано (${selectedItems.length})`}
							</span>
						</Listbox.Button>
						<Listbox.Options
							className={clsx('absolute shadow-lg z-10 bg-white w-full')}
						>
							{list?.map((item: ListItem) => {
								const selected = isSelected(item)
								return (
									<Listbox.Option key={item.id} value={item}>
										<div className='p-2 flex flex-row font-medium bg-white hover:bg-light-green hover:text-white cursor-pointer'>
											<span
												className={`${
													selected ? 'font-semibold' : 'font-normal'
												} block truncate`}
											>
												{item.value}
											</span>
										</div>
									</Listbox.Option>
								)
							})}
						</Listbox.Options>
					</>
				)}
			</Listbox>
		</div>
	)
}
