import clsx from 'clsx'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'p'> {
	isActive: boolean
	children: ReactNode
}

export const Tag = ({ className, isActive, children }: Props) => {
	return (
		<p
			className={clsx(
				'py-[10px] px-[18px] font-semibold text-sm border rounded-full inline-block cursor-pointer',
				isActive ? 'border-[#86A545]' : 'border-[#E9EAE8]',
				className,
			)}
		>
			{children}
		</p>
	)
}
