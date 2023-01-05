import clsx from 'clsx'
import Image from 'next/image'
import react, { ComponentPropsWithoutRef, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'input'> {
	icon?: ReactNode | string
	label?: string
	error?: string
	className?: string
}

export const Input = react.forwardRef<HTMLInputElement, Props>(
	({ className, label, icon, error, ...rest }: Props, ref) => {
		return (
			<div className={className}>
				{label && <label className='mb-2 inline-block'>{label}</label>}
				<div className={clsx('flex flex-row w-full relative')}>
					<div className='absolute h-full flex items-center pl-4'>
						{typeof icon === 'string' ? (
							<Image
								className='inline-block ml-4'
								src={icon as string}
								alt='Icon'
								fill
							/>
						) : (
							icon
						)}
					</div>
					<input
						ref={ref}
						{...rest}
						className='block border-gray border bg-white py-2 px-4 pl-10 w-full self-center rounded-lg outline-0'
					/>
				</div>
				{error ? <span className='text-red'>{error}</span> : ''}
			</div>
		)
	},
)
