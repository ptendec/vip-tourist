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
			'flex items-center justify-center bg-green text-white font-semibold rounded-lg py-3 w-full text-sm outline-none',
			className,
		)}
	>
		{children}
	</button>
)
