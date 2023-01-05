import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

export const Button = ({
	className,
	children,
	...rest
}: ComponentPropsWithoutRef<'button'>) => (
	<button
		{...rest}
		className={clsx(
			className,
			'flex items-center justify-center bg-green text-white font-semibold rounded-lg py-4 w-full',
		)}
	>
		{children}
	</button>
)
