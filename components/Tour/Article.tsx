import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'div'> {
	title: string
	description?: string
}

export const Article = ({ title, description, className }: Props) => {
	return (
		<>
			{description && (
				<div className={clsx(className)}>
					<p className='font-semibold mb-3 sm:text-sm'>{title}</p>
					<span className='sm:text-sm'>
						{description !== '' ? description : 'Не указано'}
					</span>
				</div>
			)}
		</>
	)
}
