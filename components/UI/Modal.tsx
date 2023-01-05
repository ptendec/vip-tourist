import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, Fragment, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	isVisible: boolean
	onClose: () => void
	children: ReactNode
	className: string
}

export const Modal = ({ isVisible, onClose, children, className }: Props) => {
	return (
		<Transition appear show={isVisible} as={Fragment}>
			<Dialog
				className={clsx('relative z-10 overflow-y-auto')}
				as='div'
				onClose={() => {
					onClose()
				}}
			>
				<Dialog.Overlay
					as='div'
					className='flex items-center justify-center min-h-screen'
				>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-dark bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel
									className={clsx(
										'w-full transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all',
										className,
									)}
								>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog.Overlay>
			</Dialog>
		</Transition>
	)
}
