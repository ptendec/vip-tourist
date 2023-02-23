import { useFirstRender } from '@/hooks/useFirstRender'
import { ListItem } from '@/utilities/interfaces'
import { Listbox } from '@headlessui/react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useState } from 'react'

interface Props extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
	icon?: string
	list: ListItem[]
	className?: string
	label?: string
	defaultChosen?: boolean
	onChange: (option: ListItem) => void
	disabled?: boolean
	chosenItem?: ListItem
}

export const ListBox = ({
	list,
	icon,
	className,
	label,
	onChange,
	defaultChosen = false,
	disabled = false,
	chosenItem,
}: Props) => {
	const firstRender = useFirstRender()
	console.log(chosenItem ? chosenItem : list[0])
	const [selectedItem, setSelectedItem] = useState<ListItem>(
		chosenItem ? chosenItem : list[0],
	)

	return (
		<div className={clsx('', className)}>
			<span className='block font-medium text-dark-blue mb-1.5'>{label}</span>
			<Listbox
				disabled={disabled}
				as={'div'}
				value={selectedItem}
				onChange={(option: ListItem) => {
					onChange(option)
					setSelectedItem(option)
				}}
			>
				{({ open }) => (
					<>
						<Listbox.Button className='flex py-2 px-7 gap-x-3 hover:bg-[#F6F6F5] rounded-lg transition-all duration-600 ease-out w-full text-elipsis'>
							<p className='flex flex-row gap-x-2'>
								{icon && (
									<Icon className={clsx('text-gray')} path={icon} size={1} />
								)}
								{!defaultChosen && !selectedItem
									? 'Выбрать'
									: selectedItem.name?.split('-')[0]}
							</p>
						</Listbox.Button>
						<div className='relative'>
							<Listbox.Options
								className={clsx(
									'absolute rounded-lg shadow-lg z-10 w-full outline-none',
								)}
							>
								{list.map(item => (
									<Listbox.Option
										key={item.id}
										className='p-2 flex flex-row bg-white hover:bg-[#F6F6F5] cursor-pointer transition-all duration-600 ease-out'
										value={item}
									>
										{item.name}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</div>
					</>
				)}
			</Listbox>
		</div>
	)
}
