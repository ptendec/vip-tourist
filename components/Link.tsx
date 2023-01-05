import clsx from 'clsx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

interface Props extends ComponentPropsWithoutRef<'a'> {
	href: string
	children: ReactNode
	highlight?: boolean
	className?: string
}

export const Link = ({ href, children, highlight = false, ...rest }: Props) => {
	const { pathname } = useRouter()
	const isActive = pathname === href && highlight

	return (
		<NextLink href={href} {...rest}>
			{children}
		</NextLink>
	)
}
