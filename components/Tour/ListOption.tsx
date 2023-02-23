import Icon from '@mdi/react'

interface Props {
	icon: string
	title: string
	description?: string | number
}

export const ListOption = ({ icon, title, description }: Props) => {
	return (
		<div className='flex gap-x-2 my-2'>
			<Icon className='translate-y-[2px]' size={1} path={icon} />
			<div>
				<p className='text-dark font-semibold text-sm text-left'>
					{description ?? '-'}
				</p>
				<span className='text-gray text-xs leading-none inline-block w-full text-left'>
					{title}
				</span>
			</div>
		</div>
	)
}
