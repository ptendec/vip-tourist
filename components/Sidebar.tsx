import { getProfile } from '@/API/profile.service'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { getNavbarList } from '@/utilities/utilities'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentPropsWithoutRef } from 'react'
import NoSSR from './Common/NoSSR'

export const Sidebar = ({
	className,
	...rest
}: ComponentPropsWithoutRef<'div'>) => {
	const { t } = useTranslation()
	const { locale, pathname } = useRouter()
	const { user } = useFirebaseAuth()
	const { data, isLoading, isError } = useQuery(
		['profile', user?.uid],
		() =>
			getProfile({
				locale: locale as string,
				id: user?.uid as string,
			}),
		{
			retry: 0,
			refetchOnWindowFocus: false,
		},
	)
	// if (isLoading) return <>Loading...</>

	return (
		<NoSSR>
			<div
				className={clsx(className, '2xl:hidden border-r border-[#E9EAE8] px-6')}
				{...rest}
			>
				<Link href='/' className='relative inline-block '>
					<Image src='/images/logo.svg' alt='VipTourist' fill />
				</Link>
				<div className='mt-10'>
					{getNavbarList(user, data).map(link => (
						<Link
							key={link.id}
							href={link.href}
							className={clsx(
								'flex flex-row items-center gap-x-3 group rounded-lg hover:bg-[#F6F6F5] px-7 py-2 transition-all duration-600 ease-out capitalize',
							)}
						>
							<Icon
								className={clsx(
									pathname === link.href ? 'text-green' : 'text-gray',
								)}
								path={link.icon}
								size={1}
							/>
							<span
								className={clsx(
									pathname === link.href
										? 'text-green font-semibold'
										: 'text-lightDark',
								)}
							>
								{t(link.label)}
							</span>
						</Link>
					))}
				</div>
			</div>
		</NoSSR>
	)
}
