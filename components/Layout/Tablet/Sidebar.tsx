import { getProfile } from '@/API/profile.service'
import NoSSR from '@/components/Common/NoSSR'
import { ListBox } from '@/components/UI/ListBox'
import { auth } from '@/config/firebase'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { getNavbarList } from '@/utilities/utilities'
import { mdiEarth, mdiHiking, mdiLogout, mdiWallet } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { signOut } from 'firebase/auth'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { usePreferencesStore } from 'store/preferences'
import { currencyList, langList } from 'utilities/static'

interface Props {
	isVisible: boolean
	onClose: () => void
}

export const Sidebar = ({ isVisible, onClose }: Props) => {
	const { currency, editPreferences } = usePreferencesStore()
	const { t } = useTranslation()
	const { locale, pathname, push } = useRouter()
	const { user } = useFirebaseAuth()

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

	return (
		<div
			className={clsx(
				'fixed overflow-y-scroll scrollbar transition-all shadow-xl xs:w-[320px] xs:pb-[70px] duration-500 ease-out h-screen  top-0 bg-white p-8 pr-0 z-20 w-[300px]',
				isVisible ? 'left-0' : '-left-[400px] overflow-y-scroll',
			)}
		>
			<NoSSR>
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
									signOut(auth).then(() => {
										toast.success(t('success'))
										push('/')
									})
								}}
							>
								<Icon className={clsx('text-gray')} path={mdiLogout} size={1} />
								{t('logout')}
							</button>
						)}
					</div>
				</div>
			</NoSSR>
		</div>
	)
}
