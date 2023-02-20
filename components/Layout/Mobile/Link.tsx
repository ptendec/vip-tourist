import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<'a'> {
	icon: string
	label: string
	href: string
}

export const PanelLink = ({ icon, label, href, className }: Props) => {
	const { t } = useTranslation()
	const { pathname } = useRouter()

	return (
		<Link href={href} className={clsx('w-16', className)}>
			<Icon
				path={icon}
				size={1}
				color={pathname === href ? '#86A545' : '#BFBFBF'}
			/>
			<span
				className={clsx(
					'text-[10px] leading-normal font-semibold',
					pathname === href ? 'text-green' : 'text-gray',
				)}
			>
				{t(label)}
			</span>
		</Link>
	)
}
