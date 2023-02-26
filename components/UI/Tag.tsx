import clsx from 'clsx'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'button'> {
	isActive: boolean
	children: ReactNode
}

export const Tag = ({ className, isActive, children, ...rest }: Props) => {
	return (
		<button
			className={clsx(
				'py-[10px] px-[18px] font-semibold text-sm border rounded-full inline-block cursor-pointer transition-all duration-300 ease-out whitespace-nowrap',
				isActive ? 'border-[#86A545]' : 'border-[#E9EAE8]',
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
