import clsx from 'clsx'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode
}
export const Container = ({ children, className, ...rest }: Props) => (
	<div className={clsx('container', className)} {...rest}>
		{children}
	</div>
)
