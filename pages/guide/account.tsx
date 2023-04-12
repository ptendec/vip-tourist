import { editOrder, getSoldOrders } from '@/API/order.service'
import { deleteTour, getMyTours } from '@/API/tour.service'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Popover } from '@/components/UI/Popover'
import { Tag } from '@/components/UI/Tag'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { generateUUID } from '@/utilities/utilities'
import {
	mdiAccount,
	mdiAlertCircle,
	mdiCancel,
	mdiCheckBold,
	mdiCheckCircle,
	mdiChevronRight,
	mdiCurrencyUsd,
	mdiDotsHorizontal,
	mdiPencil,
	mdiPlus,
	mdiTrashCan,
	mdiWallet,
	mdiWindowClose,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { useDraftStore } from 'store/draft'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const queryClient = useQueryClient()
	const { t } = useTranslation()
	const { locale, pathname, push } = useRouter()
	const { user } = useFirebaseAuth()
	const { tours } = useDraftStore()
	const { mutate } = useMutation(editOrder)
	const { removeTour } = useDraftStore()
	const { mutate: _delete } = useMutation(deleteTour)

	const profileLinks = [
		{
			id: 1,
			name: t('profile'),
			href: '/profile',
		},
		{
			id: 2,
			name: t('account'),
			href: '/guide/account',
		},
	]

	const [tour, setTour] = useState<'active' | 'consideration' | 'draft'>(
		'active',
	)
	const [order, setOrder] = useState<
		'approved' | 'consideration' | 'cancelled'
	>('approved')
	const [error, setError] = useState(false)

	const { data, refetch: refetchTours } = useQuery(
		['my-tours', user?.uid],
		() =>
			getMyTours({
				id: user?.uid,
				url: tour === 'consideration' ? '&_approved=false' : '&_approved=true',
			}),
	)

	const { data: orders, refetch: refetchOrders } = useQuery(
		['sold', 'orders', user?.uid],
		() => getSoldOrders({ id: user?.uid, status: order }),
	)

	const _deleteTour = (id: string) => {
		_delete(
			{ id },
			{
				onSuccess: () => {
					refetchTours()
				},
				onError: () => {
					toast.error(t('errorOccuredTryAgain'))
				},
			},
		)
	}

	useEffect(() => {
		refetchOrders()
	}, [order])

	useEffect(() => {
		refetchTours()
	}, [tour])

	return (
		<>
			<Head>
				<title>{`${t('profile')} | VipTourist `}</title>
			</Head>
			<Tooltip
				anchorId='addTour'
				content='Добавить тур'
				place='bottom'
				noArrow
				delayShow={200}
			/>
			<Wrapper>
				<Container className='justify-self-center py-10 '>
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
						<button
							className='rounded-lg border-gray border flex px-5 py-3 w-full font-semibold text-sm items-center mt-4'
							onClick={() => setError(true)}
						>
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
						{error && (
							<>
								<span className='text-[10px] leading-tight inline-block text-red mt-2'>
									{t('freshTag1')}
								</span>
								<span className='mb-2 text-[10px] leading-tight inline-block text-red'>
									{t('freshTag2')}
								</span>
							</>
						)}
					</div>
					<div className='mt-8'>
						<p className='font-semibold text-lg flex gap-x-3 items-center'>
							{t('myTours')}
							<Link id='addTour' href={`/guide/tour/add/?id=${generateUUID()}`}>
								<Button className='rounded-full w-6 h-6'>
									<Icon path={mdiPlus} size={0.8} />
								</Button>
							</Link>
						</p>
					</div>
					<div className='flex gap-x-3 mt-4 md:overflow-x-auto scrollbar-hide '>
						<Tag
							className='relative'
							isActive={tour === 'active'}
							onClick={() => setTour('active')}
						>
							{tour === 'active' && (
								<span className='absolute -top-2 right-0 bg-yellow rounded-full px-2'>
									{data?.length ?? '-'}
								</span>
							)}
							Активные
						</Tag>
						<Tag
							className='relative'
							isActive={tour === 'consideration'}
							onClick={() => setTour('consideration')}
						>
							{tour === 'consideration' && (
								<span className='absolute -top-2 right-0 bg-yellow rounded-full px-2'>
									{data?.length ?? '-'}
								</span>
							)}
							На рассмотрении
						</Tag>
						<Tag
							className='relative'
							isActive={tour === 'draft'}
							onClick={() => setTour('draft')}
						>
							{tour === 'draft' && (
								<span className='absolute -top-2 right-0 bg-yellow rounded-full px-2'>
									{tours.length ?? '-'}
								</span>
							)}
							Черновики
						</Tag>
					</div>
					<div className='flex flex-wrap mt-6 justify-between gap-x-[10px] gap-y-3'>
						{tour === 'draft' &&
							(tours.length !== 0 ? (
								tours.map(tour => (
									<div
										key={tour.id}
										className='text-sm flex basis-[calc(50%_-_10px)] sm:basis-full border border-[#E9EAE8] p-[10px] rounded-lg relative overflow-hidden group'
									>
										<div className='absolute right-2 -bottom-12 group-hover:bottom-2 w-10 transition-all duration-300 ease-out  flex flex-row gap-x-4 mr-4'>
											<Button
												className='bg-transparent'
												onClick={() => push(`/guide/tour/add/?id=${tour.id}`)}
											>
												<Icon path={mdiPencil} size={0.7} color='#3B3F32' />
											</Button>
											<Button
												className='bg-transparent'
												onClick={() => removeTour(tour.id)}
											>
												<Icon path={mdiTrashCan} size={0.7} color='#3B3F32' />
											</Button>
										</div>
										<span className='relative inline-block basis-20 h-20 shrink-0'>
											{typeof tour.mainPhotoUrl === 'string' &&
												tour.mainPhotoUrl.length !== 0 && (
													<Image
														className='rounded-lg'
														src={tour.mainPhotoUrl}
														alt='Фотография тура'
														fill
													/>
												)}
										</span>
										<div className='ml-[10px]'>
											<p className='font-semibold '>{tour.name}</p>
											<span className='text-gray limit'>
												{tour.description}
											</span>
										</div>
									</div>
								))
							) : (
								<p>У вас нету туров в черновике</p>
							))}
						{tour === 'active' ||
						(tour === 'consideration' &&
							data?.filter(tour => tour.active).length !== 0)
							? data?.map(tour => (
									<div
										key={tour.id}
										className='text-sm overflow-hidden group flex basis-[calc(50%_-_10px)] sm:basis-full border border-[#E9EAE8] p-[10px] rounded-lg relative'
									>
										<div className='absolute right-0 top-0 w-10'>
											{tour.remark && (
												<Popover
													head={
														<Button className='bg-transparent '>
															<Icon
																className='text'
																path={mdiAlertCircle}
																size={1}
																color='#FFCE1F'
															/>
														</Button>
													}
													body={<>{tour.remark}</>}
												/>
											)}
										</div>
										<div className='absolute right-2 -bottom-12 group-hover:bottom-2 w-10 transition-all duration-300 ease-out flex flex-row gap-x-4 mr-4'>
											<Button
												className='bg-transparent'
												onClick={() => push(`/guide/tour/edit/?id=${tour.id}`)}
											>
												<Icon path={mdiPencil} size={0.7} color='#3B3F32' />
											</Button>
											<Button
												className='bg-transparent'
												onClick={() => _deleteTour(tour.id)}
											>
												<Icon path={mdiTrashCan} size={0.7} color='#3B3F32' />
											</Button>
										</div>
										<span className='relative inline-block basis-20 h-20 shrink-0'>
											<Image
												className='rounded-lg'
												src={tour.mainPhotoUrl ?? ''}
												alt='Фотография тура'
												fill
											/>
										</span>
										<div className='ml-[10px]'>
											<p className='font-semibold '>{tour.name}</p>
											<span className='text-gray limit'>
												{tour.description}
											</span>
										</div>
									</div>
							  ))
							: null}
					</div>
					<div className='mt-8'>
						<p className='font-semibold text-lg flex gap-x-3 items-center'>
							{t('mySales')}
						</p>
					</div>
					<div className='flex gap-x-3 mt-4 gap-y-3 md:overflow-x-auto scrollbar-hide'>
						<Tag
							isActive={order === 'approved'}
							onClick={() => setOrder('approved')}
						>
							Подтвержденные
						</Tag>
						<Tag
							isActive={order === 'consideration'}
							onClick={() => setOrder('consideration')}
						>
							Неподтвержденные
						</Tag>
						<Tag
							isActive={order === 'cancelled'}
							onClick={() => setOrder('cancelled')}
						>
							Отменено
						</Tag>
					</div>
					<div className='flex flex-wrap mt-6 justify-between gap-y-3'>
						{orders?.map(order => (
							<div
								key={order.id}
								className='text-sm basis-[calc(50%_-_10px)] sm:basis-full border border-[#E9EAE8] p-[15px] rounded-lg'
							>
								<div className='flex justify-between w-full flex-row items-start'>
									<p className='font-semibold'>{order.tour?.name}</p>
									<Popover
										head={
											<Button className='bg-transparent right-3 w-6 h-6 shrink-0'>
												<Icon
													path={mdiDotsHorizontal}
													size={1}
													color='#3B3F32'
												/>
											</Button>
										}
										body={
											<div>
												<Button
													className='bg-transparent text-dark hover:bg-[#F6F6F5] px-2 py-2'
													onClick={() => {
														mutate(
															{
																id: order.id,
																request: {
																	seller_confirmed: true,
																	canceled: false,
																},
															},
															{
																onSuccess: () => {
																	toast.success(t('success'))
																	queryClient.refetchQueries(['sold', 'orders'])
																},
																onError: () => {
																	toast.error(t('errorOccuredTryAgain'))
																},
															},
														)
													}}
												>
													<Icon
														className='mr-3 text-green'
														path={mdiCheckBold}
														size={1}
													/>
													Подтвердить
												</Button>
												<Button
													className='bg-transparent text-dark hover:bg-[#F6F6F5] px-2 py-2'
													onClick={() => {
														mutate(
															{
																id: order.id,
																request: {
																	canceled: true,
																	seller_confirmed: false,
																},
															},
															{
																onSuccess: () => {
																	toast.success(t('success'))
																	toast.success('Изменения успешно внесены')
																	queryClient.refetchQueries(['sold', 'orders'])
																},
																onError: () => {
																	toast.error(t('errorOccuredTryAgain'))
																},
															},
														)
													}}
												>
													<Icon
														className='mr-3 text-[#D84343]'
														path={mdiWindowClose}
														size={1}
													/>
													Отменить
												</Button>
											</div>
										}
									/>
								</div>
								<p className='mt-2'>{order.price} $</p>
								<p className='mt-1 text-gray'>{order.profile?.name}</p>
								<span className='block bg-gray h-[0.33px] my-[10px]' />
								<p className='flex items-center gap-x-3 text-gray'>
									<Icon path={mdiAccount} size={1} />
									{!order.activated
										? 'Турист еще не использовал билет'
										: 'Турист использовал билет'}
								</p>
								<span className='block bg-gray h-[0.33px] my-[10px]' />
								<p
									className={clsx(
										'flex items-center gap-x-3 ',
										order.seller_confirmed ? 'text-green' : 'text-red',
									)}
								>
									<Icon
										path={order.seller_confirmed ? mdiCheckCircle : mdiCancel}
										size={1}
										className={clsx(
											order.seller_confirmed ? 'text-green' : 'text-red',
										)}
									/>
									{!order.canceled
										? order.seller_confirmed
											? 'Вы подтвердили билет'
											: 'Вы еще не подтвердили билет'
										: 'Вы отменили билет'}
								</p>
							</div>
						))}
					</div>
				</Container>
			</Wrapper>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
