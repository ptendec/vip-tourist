import { getProfile } from '@/API/profile.service'
import NoSSR from '@/components/Common/NoSSR'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Currency } from '@/components/Modal/Edit/Currency'
import { Lang } from '@/components/Modal/Edit/Lang'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { langList } from '@/utilities/static'
import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { usePreferencesStore } from 'store/preferences'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale, pathname, push } = useRouter()
	const { user } = useFirebaseAuth()
	const { currency, editPreferences } = usePreferencesStore()

	const [editLang, setEditLang] = useState(false)
	const [editCurrency, setEditCurrency] = useState(false)

	const { data, isLoading, isError, refetch } = useQuery(
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

	return (
		<>
			<Head>
				<title>{t('profile')} | VipTourist</title>
			</Head>
			<Tooltip
				anchorId='addPhoto'
				content='Загрузить фотографию'
				place='right'
				noArrow
				delayShow={200}
			/>
			<NoSSR>
				<Lang isVisible={editLang} onClose={() => setEditLang(false)} />
				<Currency
					isVisible={editCurrency}
					onClose={() => setEditCurrency(false)}
				/>
			</NoSSR>
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='justify-self-center flex flex-col bg-[#eeeeef] min-h-screen'>
					<div className='py-5 bg-white xs:w-[calc(100%_+_2rem)] -mx-4 mt-10 px-4'>
						{user && data ? (
							<div
								className='flex gap-x-5 items-center'
								onClick={() => push('/profile')}
							>
								<span className='w-[80px] h-[80px] relative overflow-hidden flex items-center rounded-full'>
									<Image
										alt='User photo'
										fill
										className='rounded-full'
										unoptimized
										src={
											data?.photo_url ??
											`https://ui-avatars.com/api/?name=${user?.email}&size=128&font-size=0.55&rounded=true&background=ededed&color=86A545&format=svg`
										}
									/>
								</span>
								<div>
									<p className='font-semibold '>{data.name}</p>
									<span className='font-semibold text-sm text-green capitalize mt-2'>
										{data?.is_verified ? t('verified') : t('unverified')}
									</span>
								</div>
								<Button className='bg-transparent w-[40px] ml-auto'>
									<Icon path={mdiChevronRight} size={1} color='#3B3F32' />
								</Button>
							</div>
						) : (
							<Button onClick={() => push('/auth/registration')}>
								Войти или зарегистрироваться
							</Button>
						)}
					</div>
					<div className='py-5 bg-white xs:w-[calc(100%_+_2rem)] -mx-4 mt-2 px-4'>
						<p className='font-semibold text-sm mb-3 block'>{t('settings')}</p>
						<div
							className='flex justify-between my-2.5'
							onClick={() => setEditLang(true)}
						>
							<span className='text-sm'>{t('language')}</span>
							<span className='text-sm'>
								{t(langList.find(item => item.value === locale)?.name ?? '-')}
							</span>
						</div>
						<span className='w-full bg-[#b9b9bb] h-[0.33px] block' />
						<div
							className='flex justify-between my-2.5'
							onClick={() => setEditCurrency(true)}
						>
							<span className='text-sm'>{t('selectCurrency')}</span>
							<span>{currency.name}</span>
						</div>
					</div>
					<div className='py-5 bg-white xs:w-[calc(100%_+_2rem)] -mx-4 mt-2 px-4'>
						<p className='font-semibold text-sm mb-3 block'>{t('support')}</p>
						<p className='block my-2.5 text-sm'>О сайте</p>
						<span className='w-full bg-[#b9b9bb] h-[0.33px] block' />
						<p className='block my-2.5 text-sm'>{t('helpCenter')}</p>
					</div>
					<div className='py-5 bg-white xs:w-[calc(100%_+_2rem)] -mx-4 mt-2 px-4'>
						<p className='font-semibold text-sm mb-3 block'>{t('support')}</p>
						<p className='block my-2.5 text-sm'>{t('termsOfUse')}</p>
						<span className='w-full bg-[#b9b9bb] h-[0.33px] block' />
						<p className='block my-2.5 text-sm'>{t('privacyPolicy')}</p>
					</div>
				</Container>
			</div>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
