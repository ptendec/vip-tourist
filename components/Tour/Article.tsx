import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	title: string
	description: string
}

export const Article = ({ title, description, className }: Props) => {
	return (
		<div className={clsx(className)}>
			<p className='font-semibold mb-3'>{title}</p>
			<span>{description}</span>
		</div>
	)
}
