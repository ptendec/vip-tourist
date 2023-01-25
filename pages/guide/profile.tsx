import { getCities } from '@/API/city.service'
import { getTours } from '@/API/tour.service'
import { AlertModal } from '@/components/Modal/AlertModal'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/UI/Button'
import Checkbox from '@/components/UI/Checkbox'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { mdiAccount, mdiCamera, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { json } from 'utilities/utilities'

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['tours'], () =>
		getTours({ locale: context.locale as string }),
	)
	await queryClient.prefetchQuery(['cities'], () =>
		getCities({ locale: context.locale as string }),
	)
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
			dehydratedState: json(dehydrate(queryClient)),
		},
	}
}

const Main = () => {
	const { t } = useTranslation()
	const { locale, pathname } = useRouter()

	const profileLinks = [
		{
			id: 1,
			name: t('profile'),
			href: '/guide/profile',
		},
		{
			id: 2,
			name: t('account'),
			href: '/guide/account',
		},
	]

	const [isAlert, setIsAlert] = useState(false)
	const [hasWhatsapp, setHasWhatsapp] = useState(false)
	const [hasViber, setHasViber] = useState(false)
	const [hasTelegram, setHasTelegram] = useState(false)

	return (
		<>
			<Head>
				<title>Проверка</title>
			</Head>
			<AlertModal isVisible={isAlert} onClose={() => setIsAlert(false)} />
			<div className='flex '>
				<Sidebar className='basis-80 grow-1 srhink-0'></Sidebar>
				<Container className='justify-self-center pt-10 flex flex-col'>
					<div className='flex gap-x-3'>
						{profileLinks.map(link => (
							<Link
								className={clsx(
									'px-4 py-2 text-sm border border-[#E9EAE8] rounded-lg font-semibold',
									pathname === link.href && 'border-green text-green',
								)}
								key={link.id}
								href={link.href}
							>
								{link.name}
							</Link>
						))}
					</div>
					<div className='w-5/12 self-center flex flex-col items-center pb-10'>
						<span className='w-32 h-32 relative inline-block'>
							<Button className='z-10 absolute right-0 bottom-0 bg-green p-2 rounded-full hover:scale-[1.05] w-9 h-9'>
								<Icon color='#fff' path={mdiCamera} size={0.8} />
							</Button>
							<Image alt='User photo' fill src='/images/demo8.png' />
						</span>
						<p className='font-semibold text-sm text-green'>Верифицированный</p>
						<div className='mt-8 w-full'>
							<Input
								className='mb-5'
								label={'Имя фамилия'}
								placeholder='Mikhail Petrovich'
								icon={<Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>}
							/>
							<Input
								className='mb-5'
								label={'Имя фамилия'}
								placeholder='Mikhail Petrovich'
								icon={<Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>}
							/>
							<Input
								className=''
								label={'Имя фамилия'}
								placeholder='Mikhail Petrovich'
								icon={<Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>}
							/>
						</div>
						<div className='mt-4 flex gap-x-5 w-full'>
							<label className='text-sm flex items-center gap-x-1'>
								<Checkbox
									checked={hasWhatsapp}
									onChange={state => setHasWhatsapp(state)}
								/>
								Whatsapp
							</label>
							<label className='text-sm flex items-center gap-x-1'>
								<Checkbox
									checked={hasViber}
									onChange={state => setHasViber(state)}
								/>
								Viber
							</label>
							<label className='text-sm flex items-center gap-x-1'>
								<Checkbox
									checked={hasTelegram}
									onChange={state => setHasTelegram(state)}
								/>
								Telegram
							</label>
						</div>
						<hr className='w-full bg-[rgba(60,60,67,0.36);] h-[0.33px] my-8' />
						<div className='w-full'>
							<p>Чтобы стать гидом нового тура, вам нужно:</p>
							<p className='flex gap-x-2 mt-6'>
								<span className='bg-lightDark text-white text-sm w-6 h-6 flex items-center justify-center rounded-full shrink-0'>
									1
								</span>
								Указать ссылку на профиль в одной из социальных сетей (с
								информацией о ваших турах):
							</p>
							<Input
								className='mt-6'
								placeholder='Instagram, Facebook или Twitter'
							/>
							<p className='flex gap-x-2 mt-6 mb-6'>
								<span className='bg-lightDark text-white text-sm w-6 h-6 flex items-center justify-center rounded-full shrink-0'>
									2
								</span>
								Загрузить следующие документы:
							</p>
							<div className='flex justify-between'>
								<p>Чтобы стать гидом нового тура, вам нужно:</p>
								<Button className='rounded-full w-6 h-6 hover:scale-[1.1]'>
									<Icon path={mdiPlus} size={0.8} />
								</Button>
							</div>
							<div className='flex justify-between mt-4'>
								<p>Чтобы стать гидом нового тура, вам нужно:</p>
								<Button className='rounded-full w-6 h-6 hover:scale-[1.1]'>
									<Icon path={mdiPlus} size={0.8} />
								</Button>
							</div>
						</div>
						<Button className='mt-8'>{t('save')}</Button>
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
