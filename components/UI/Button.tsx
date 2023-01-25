import { mdiLoading } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
	isLoading?: boolean
}

export const Button = ({
	className,
	children,
	isLoading = false,
	...rest
}: Props) => (
	<button
		{...rest}
		className={clsx(
			'flex items-center justify-center bg-green text-white font-semibold rounded-lg py-3 w-full text-sm outline-none transition-all duration-600 ease-out',
			className,
		)}
	>
		<Icon
			className={clsx('animate-spin', isLoading ? 'w-auto' : 'w-0')}
			path={mdiLoading}
			size={isLoading ? 0.7 : 0}
		/>
		{children}
	</button>
)
