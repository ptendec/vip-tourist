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
				{label && (
					<label className='mb-2 inline-block font-semibold text-sm text-lightDark'>
						{label}
					</label>
				)}
				<div className={clsx('flex flex-row w-full relative')}>
					<div className='absolute h-full flex items-center pl-2'>
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
						className='block border-gray border bg-white py-3 pl-10 px-5 w-full self-center rounded-lg outline-0 placeholder:text-sm text-sm'
					/>
				</div>
				<span className='text-[#EB455F] text-xs font-medium'>{error}</span>
			</div>
		)
	},
)
