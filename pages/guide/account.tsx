import { getMyTours } from '@/API/tour.service'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Tag } from '@/components/UI/Tag'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import {
	mdiCheckCircle,
	mdiChevronRight,
	mdiCurrencyUsd,
	mdiPlus,
	mdiWallet,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Tooltip } from 'react-tooltip'

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

	const { data } = useQuery(['my-tours', user?.uid], () =>
		getMyTours({ id: user?.uid }),
	)

	return (
		<>
			<Head>
				<title>Профиль</title>
			</Head>
			<Tooltip
				anchorId='addTour'
				content='Добавить тур'
				place='bottom'
				noArrow
			/>

			<div className='flex '>
				<Sidebar className='basis-80 grow-1 srhink-0'></Sidebar>
				<Container className='justify-self-center py-10'>
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
					<div className='mt-8'>
						<p className='text-lg font-semibold mb-4'>{t('accountBalance')}</p>
						<button className='rounded-lg border-gray border flex px-5 py-3 w-full font-semibold text-sm items-center'>
							<Icon
								color='#BFBFBF'
								className='mr-2'
								path={mdiWallet}
								size={1}
							/>
							•••• •••• •••• ••••
							<Icon
								className='flex ml-auto '
								color='#BFBFBF'
								path={mdiChevronRight}
								size={1}
							/>
						</button>
						<button className='rounded-lg border-gray border flex px-5 py-3 w-full font-semibold text-sm items-center mt-4'>
							<Icon
								color='#BFBFBF'
								className='mr-2'
								path={mdiCurrencyUsd}
								size={1}
							/>
							Пополнить баланс
							<Icon
								className='flex ml-auto '
								color='#BFBFBF'
								path={mdiChevronRight}
								size={1}
							/>
						</button>
					</div>
					<div className='mt-8'>
						<p className='font-semibold text-lg flex gap-x-3 items-center'>
							Мои туры
							<Link id='addTour' target='_blank' href='/guide/tour?state=add'>
								<Button className='rounded-full w-6 h-6'>
									<Icon path={mdiPlus} size={0.8} />
								</Button>
							</Link>
						</p>
					</div>
					<div className='flex gap-x-3 mt-4'>
						<Tag isActive={true}>Активные</Tag>
						<Tag isActive={false}>На рассмотрении</Tag>
						<Tag isActive={false}>Черновики</Tag>
					</div>
					<div className='flex flex-wrap mt-6 justify-between gap-x-[10px] gap-y-3'>
						{data?.length ? (
							data?.map(tour => (
								<div
									key={tour.id}
									className='text-sm flex basis-[calc(50%_-_10px)] border border-[#E9EAE8] p-[10px] rounded-lg'
								>
									<span className='relative inline-block basis-20 h-20 shrink-0'>
										<Image
											className=''
											src={tour.image_urls?.split('|')[0] ?? ''}
											alt='Фотография тура'
											fill
										/>
									</span>
									<div className='ml-[10px]'>
										<p className='font-semibold'>{tour.name}</p>
										<span className='text-gray'>{tour.description}</span>
									</div>
								</div>
							))
						) : (
							<p className='font-semibold'>У вас нет созданных туров</p>
						)}
					</div>
					<div className='mt-8'>
						<p className='font-semibold text-lg flex gap-x-3 items-center'>
							Мои продажи
						</p>
					</div>
					<div className='flex gap-x-3 mt-4 gap-y-3'>
						<Tag isActive={true}>Подтвержденные</Tag>
						<Tag isActive={false}>Неподтвержденные</Tag>
						<Tag isActive={false}>Отменено</Tag>
					</div>
					<div className='flex flex-wrap mt-6 justify-between gap-y-3'>
						{[1, 2, 3, 4].map(element => (
							<div
								key={element}
								className='text-sm basis-[calc(50%_-_10px)] border border-[#E9EAE8] p-[15px] rounded-lg'
							>
								<p className='font-semibold'>Тур в Чарынский каньон</p>
								<p className='mt-2'>x1 230.0 $</p>
								<p className='mt-1 text-gray'>Egor Letov</p>
								{/* <span className='block bg-gray h-[0.33px] my-[10px]' /> */}
								{/* <p className='flex items-center gap-x-3 text-gray'> */}
								{/* <Icon path={mdiAccount} size={1} /> */}
								{/* Турист еще не использовал билет */}
								{/* </p> */}
								{/* <span className='block bg-gray h-[0.33px] my-[10px]' /> */}
								<p className='flex items-center gap-x-3 text-green'>
									<Icon path={mdiCheckCircle} size={1} color='#86A545' />
									Вы подтвердили билет
								</p>
							</div>
						))}
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
