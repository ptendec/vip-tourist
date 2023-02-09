import { useFirstRender } from '@/hooks/useFirstRender'
import { ListItem } from '@/utilities/interfaces'
import { Listbox } from '@headlessui/react'
import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import Image from 'next/image'
import { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react'

interface Props extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
	icon?: ReactNode | string
	list: ListItem[]
	className?: string
	width: string
	label?: string
	defaultChosen?: boolean
	onChange: (option: ListItem) => void
	disabled?: boolean
	chosenItem?: ListItem
}

export const Category = ({
	list,
	icon,
	className,
	width,
	label,
	onChange,
	defaultChosen = false,
	disabled = false,
	chosenItem,
}: Props) => {
	const firstRender = useFirstRender()

	const [selectedItem, setSelectedItem] = useState<ListItem>(
		chosenItem ? chosenItem : list[0],
	)

	useEffect(() => {
		if (firstRender) chosenItem ? onChange(chosenItem) : onChange(list[0])
	}, [list])

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
						<Listbox.Button className='flex flex-row items-center justify-between w-full rounded-lg border border-[#D0D5DD] outline-none px-4 py-3 text-dark text-sm'>
							<p className='flex flex-row'>
								{typeof icon === 'string' ? (
									<Image
										className='inline-block ml-4'
										src={icon as string}
										alt='Icon'
										fill
									/>
								) : (
									icon
								)}
								{!defaultChosen && !selectedItem
									? 'Выбрать'
									: selectedItem?.value}
							</p>
							<Icon
								path={mdiChevronRight}
								size={1}
								className={clsx(
									'transition-all duration-600 ease-out',
									open && 'rotate-90',
								)}
								color='#BFBFBF'
							/>
						</Listbox.Button>
						<div className='relative'>
							<Listbox.Options
								className={clsx('absolute rounded-lg shadow-md z-10', width)}
							>
								{list.map(item => (
									<Listbox.Option
										key={item.id}
										className='p-2 flex flex-row bg-white hover:bg-light-green hover:font-semibold cursor-pointer'
										value={item}
									>
										{typeof icon === 'string' ? (
											<Image
												className='inline-block ml-4'
												src={icon as string}
												alt='Icon'
												fill
											/>
										) : (
											icon
										)}
										{item.value}
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
