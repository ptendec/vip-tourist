import { Transition, Popover as UIPopover } from '@headlessui/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, Fragment, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	head: ReactNode
	body: ReactNode
}

export const Popover = ({ head, body, className }: Props) => {
	return (
		<UIPopover className='relative'>
			{({ open }) => (
				<>
					<UIPopover.Button className={clsx('', className)}>
						{head}
					</UIPopover.Button>
					<Transition
						as={Fragment}
						enter='transition ease-out duration-200'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-150'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						<UIPopover.Panel
							className={clsx(
								'py-2.5 px-3 bg-white absolute rounded-lg right-0 z-50',
							)}
						>
							{body}
						</UIPopover.Panel>
					</Transition>
				</>
			)}
		</UIPopover>
	)
}
