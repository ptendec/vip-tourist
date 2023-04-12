import { editProfile, getProfile } from '@/API/profile.service'
import { auth } from '@/config/firebase'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { currencyList, langList } from '@/utilities/static'
import { getNavbarList } from '@/utilities/utilities'
import { mdiEarth, mdiHiking, mdiLogout, mdiWallet } from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { signOut } from 'firebase/auth'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentPropsWithoutRef } from 'react'
import { usePreferencesStore } from 'store/preferences'
import NoSSR from '../Common/NoSSR'
import { ListBox } from '../UI/ListBox'

export const Sidebar = ({
	className,
	...rest
}: ComponentPropsWithoutRef<'div'>) => {
	const { currency, editPreferences } = usePreferencesStore()
	const { t } = useTranslation()
	const { locale, pathname, push, asPath } = useRouter()
	const { user } = useFirebaseAuth()
	const { mutate } = useMutation(editProfile)
	console.log(!!user?.uid)
	const { data, isLoading, isError } = useQuery(
		['profile', user?.uid],
		() =>
			getProfile({
				locale: locale as string,
				id: user?.uid as string,
			}),
		{
			enabled: !!user?.uid,
			retry: 0,
			refetchOnWindowFocus: false,
		},
	)

	// TODO: При наличии авторизации, спросить уверен ли он, что хочет стать гидом, если подтвердит, то отправлять запрос на изменение поля isTourst: true

	// if (isLoading) return <>Loading...</>

	return (
		<NoSSR>
			<div
				className={clsx(
					className,
					'2xl:hidden border-r border-[#E9EAE8] px-6 pt-10',
				)}
				{...rest}
			>
				<Link href='/' className=''>
					<span className='relative flex justify-center'>
						<Image
							src='/images/logo.svg'
							width={162}
							height={32}
							alt='VipTourist'
						/>
					</span>
				</Link>
				<div className='mt-10'>
					{getNavbarList(user, data).map(link => (
						<Link
							key={link.id}
							href={link.href}
							className={clsx(
								'flex flex-row items-center gap-x-3 group rounded-lg hover:bg-[#F6F6F5] px-7 py-2 transition-all duration-300 ease-out capitalize w-full',
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
					<div className='mt-60'>
						{!user && (
							<button
								className='flex py-2 px-7 gap-x-3 hover:bg-[#F6F6F5] rounded-lg transition-all duration-300 ease-out w-full'
								onClick={() => {
									push('/auth/registration')
								}}
							>
								<Icon className={clsx('text-gray')} path={mdiHiking} size={1} />
								{t('becomeGuide')}
							</button>
						)}
						<ListBox
							key={locale}
							chosenItem={currencyList
								.map(item => ({
									id: item.id,
									value: t(item.value),
									name: t(item.name) ?? '-',
								}))
								.find(item => item.value === currency.value)}
							icon={mdiWallet}
							list={currencyList.map(item => ({
								id: item.id,
								value: item.value,
								name: `${item.value} - ${item.name}`,
							}))}
							onChange={item => {
								editPreferences({
									...(currencyList.find(element => element.id === item.id) ??
										currencyList[0]),
								})
							}}
						/>
						<ListBox
							chosenItem={langList
								.map(item => ({
									id: item.id,
									value: item.value,
									name: t(item.name ?? '-') ?? '-',
								}))
								.find(item => item.value === locale)}
							icon={mdiEarth}
							list={langList.map(item => ({
								id: item.id,
								value: t(item.value),
								name: t(item.name ?? '-') ?? '-',
							}))}
							onChange={item => {
								push('/', undefined, { locale: item.value, shallow: false })
							}}
						/>
						{user && (
							<button
								className='flex py-2 px-7 gap-x-3 hover:bg-[#F6F6F5] rounded-lg transition-all duration-300 ease-out w-full mt-12'
								onClick={() => {
									signOut(auth)
									push('/')
								}}
							>
								<Icon className={clsx('text-gray')} path={mdiLogout} size={1} />
								{t('logout')}
							</button>
						)}
					</div>
				</div>
			</div>
		</NoSSR>
	)
}
