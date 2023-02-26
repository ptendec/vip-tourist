import { ListItem } from '@/utilities/interfaces'
import { Listbox, Transition } from '@headlessui/react'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, Fragment, useState } from 'react'

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
	const [selectedItem, setSelectedItem] = useState<ListItem>(
		chosenItem ? chosenItem : list[0],
	)

	return (
		<div className={clsx('', className)}>
			<span className='block font-medium text-dark-blue mb-1.5'>{label}</span>
			<Listbox
				className={'relative'}
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
						<Listbox.Button className='flex py-2 px-7 gap-x-3 hover:bg-[#F6F6F5] rounded-lg transition-all duration-300 ease-out w-full text-elipsis'>
							<p className='flex flex-row gap-x-2'>
								{icon && (
									<Icon className={clsx('text-gray')} path={icon} size={1} />
								)}
								{!defaultChosen && !selectedItem
									? 'Выбрать'
									: selectedItem.name?.split('-')[0]}
							</p>
						</Listbox.Button>
						<Transition
							as={Fragment}
							enter='transition ease-out duration-200'
							enterFrom='opacity-0 translate-y-1'
							enterTo='opacity-100 translate-y-0'
							leave='transition ease-in duration-150'
							leaveFrom='opacity-100 translate-y-0'
							leaveTo='opacity-0 translate-y-1'
						>
							<Listbox.Options
								className={clsx(
									'absolute rounded-lg shadow-lg z-10 w-full outline-none bottom-12',
								)}
							>
								{list.map((item, index) => (
									<Listbox.Option
										key={item.id}
										className={clsx(
											'py-2.5 px-3 flex flex-row bg-white hover:bg-[#F6F6F5] cursor-pointer transition-all duration-300 ease-out',
											list.length - 1 === index && 'rounded-b-lg',
											index === 0 && 'rounded-t-lg',
										)}
										value={item}
									>
										{item.name}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</>
				)}
			</Listbox>
		</div>
	)
}
