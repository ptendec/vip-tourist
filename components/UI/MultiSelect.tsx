import { useFirstRender } from '@/hooks/useFirstRender'
import { ListItem } from '@/utilities/interfaces'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef, Fragment, useEffect, useState } from 'react'

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
	const { t } = useTranslation()
	const firstRender = useFirstRender()

	const [isOpen, setIsOpen] = useState(false)
	const [selectedItems, setSelectedItems] = useState<ListItem[]>(chosenItems)

	useEffect(() => {
		if (!firstRender) onChange(selectedItems)
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
		setIsOpen(true)
	}

	function handleDeselect(item: ListItem) {
		const selectedItemsUpdated = selectedItems.filter(
			(element: ListItem) => element.id !== item.id,
		)
		setSelectedItems(selectedItemsUpdated)
	}
	useEffect(() => {
		console.log(open)
	}, [open])

	return (
		<div className={clsx(className, 'w-full')}>
			<Listbox
				as='div'
				open={true}
				value={selectedItems}
				// @ts-expect-error Несответствие типов
				onChange={(element: ListItem) => handleSelect(element)}
				className='relative'
			>
				{() => (
					<>
						<Listbox.Label className='inline-block font-semibold text-sm text-lightDark mb-1.5'>
							{label}
						</Listbox.Label>
						<Listbox.Button
							// @ts-expect-error Несответствие типов
							open={true}
							className='block border-gray border bg-white py-3 px-5 w-full rounded-lg outline-0 placeholder:text-sm text-sm text-left'
						>
							<span className='truncate'>
								{selectedItems.length === 0
									? 'Выберите '
									: `Выбрано (${selectedItems.length})`}
							</span>
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
									'absolute shadow-lg z-10 bg-white w-full max-h-60 overflow-y-auto scrollbar mt-2 rounded-lg outline-none bottom-14',
								)}
							>
								{list?.map((item: ListItem, index) => {
									const selected = isSelected(item)
									return (
										<Listbox.Option
											key={item.id}
											value={item}
											className={clsx(
												'py-2.5 px-3 flex flex-row hover:bg-[#F6F6F5] cursor-pointer transition-all duration-300 ease-out',
												list.length - 1 === index && 'rounded-b-lg',
												index === 0 && 'rounded-t-lg',
											)}
										>
											<span
												className={`${
													selected ? 'font-semibold' : 'font-normal'
												} block truncate`}
											>
												{t(item.name as string)}
											</span>
										</Listbox.Option>
									)
								})}
							</Listbox.Options>
						</Transition>
					</>
				)}
			</Listbox>
		</div>
	)
}
