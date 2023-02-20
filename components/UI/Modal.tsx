import useWindowDimensions from '@/hooks/useWindowDimensions'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
	ComponentPropsWithoutRef,
	forwardRef,
	Fragment,
	ReactNode,
	useEffect,
} from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { RefHandles } from 'react-spring-bottom-sheet/dist/types'

interface Props extends ComponentPropsWithoutRef<'div'> {
	isVisible: boolean
	onClose: () => void
	children: ReactNode
	className: string
}

export const Modal = forwardRef(
	(
		{ isVisible, onClose, children, className, ...props }: Props,
		ref: React.ForwardedRef<RefHandles>,
	) => {
		const { width } = useWindowDimensions()

		useEffect(() => onClose, [])

		if (width && width <= 768) {
			return (
				<BottomSheet
					{...props}
					ref={ref}
					open={isVisible}
					className={clsx(className, 'z-50 relative')}
					onDismiss={onClose}
					defaultSnap={({ snapPoints, lastSnap }) => lastSnap ?? snapPoints[1]}
					// snapPoints={({ height, minHeight, maxHeight }) => [
					// 	maxHeight - maxHeight / 5,
					// 	Math.min(Math.max(height, minHeight), maxHeight * 0.525),
					// ]}
					expandOnContentDrag={true}
				>
					<div className={clsx('', className)}>{children}</div>
				</BottomSheet>
			)
		}
		return (
			<Transition appear show={isVisible} as={Fragment}>
				<Dialog
					className={clsx('relative z-50 overflow-y-auto')}
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
	},
)

Modal.displayName = 'Modal'
