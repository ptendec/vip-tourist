import { getProfile } from '@/API/profile.service'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { ProfileFields } from '@/utilities/interfaces'
import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<ProfileFields>()

	const { t } = useTranslation()
	const { locale, pathname } = useRouter()
	const { user } = useFirebaseAuth()

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

	if (isLoading) return <>Loading...</>

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
			<div className='flex justify-center w-full'>
				<Sidebar className='basis-64 shrink-0'></Sidebar>
				<Container className='justify-self-center flex flex-col bg-[#eeeeef] min-h-screen'>
					<div className='py-5 bg-white xs:w-[calc(100%_+_2rem)] -mx-4 mt-10 px-2'>
						{user && data ? (
							<div className='flex gap-x-5 items-center'>
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
									<p className='font-semibold'>{data.name}</p>
									<span className='font-semibold text-sm text-green capitalize mt-2'>
										{data?.is_verified ? t('verified') : t('unverified')}
									</span>
								</div>
								<Button className='bg-transparent w-[40px] ml-auto'>
									<Icon path={mdiChevronRight} size={1} color='#3B3F32' />
								</Button>
							</div>
						) : (
							<Button className=''>Войти или зарегистрироваться</Button>
						)}
					</div>
					<div className='py-5 bg-white xs:w-[calc(100%_+_2rem)] -mx-4 mt-2 px-2'>
						<p className='font-semibold'>{t('settings')}</p>
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
