import { uploadImage } from '@/API/cloudinary.service'
import { editProfile, getProfile } from '@/API/profile.service'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/UI/Button'
import Checkbox from '@/components/UI/Checkbox'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { ProfileFields } from '@/utilities/interfaces'
import {
	mdiAccount,
	mdiCamera,
	mdiEmail,
	mdiLoading,
	mdiPhone,
	mdiPlus,
} from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
	const { mutate: edit } = useMutation(editProfile)
	const { mutate: upload, isLoading: uploading } = useMutation(uploadImage)
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
	console.log(data?.documents_urls)

	useEffect(() => {
		setHasWhatsapp(data?.hasWhatsapp ?? false)
		setHasViber(data?.hasViber ?? false)
		setHasTelegram(data?.hasTelegram ?? false)

		reset({
			email: data?.email,
			socialLink: data?.socialLink,
			fullName: data?.name,
			phone: data?.phone_number,
		})
	}, [data])

	const [hasWhatsapp, setHasWhatsapp] = useState(data?.hasWhatsapp ?? false)
	const [hasViber, setHasViber] = useState(data?.hasViber ?? false)
	const [hasTelegram, setHasTelegram] = useState(data?.hasTelegram ?? false)

	const onSubmit = (fields: ProfileFields) => {
		edit(
			{
				id: data?.id,
				request: {
					hasWhatsapp,
					hasViber,
					hasTelegram,
					name: fields.fullName,
					email: fields.email,
					phone_number: fields.phone,
					socialLink: fields.socialLink,
				},
			},
			{
				onSuccess: () => {
					toast.success('Успешно изменено')
				},
				onError: () => {
					toast.error('Что-то пошло не так, попробуйте позднее')
				},
			},
		)
	}

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		const image = event.currentTarget.files[0]
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'sgdiyf4c')
		upload(formData, {
			onSuccess: response => {
				edit(
					{
						id: data?.id,
						request: {
							photo_url: response.secure_url,
						},
					},
					{
						onSuccess: () => {
							toast.success('Успешно загружено')
							refetch()
						},
						onError: () => {
							toast.error('Что-то пошло не так, попробуйте позднее')
						},
					},
				)
			},
			onError: error => {
				toast.error('Не удалось загрузить, попробуйте позднее')
				console.log(error)
			},
		})
	}

	const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		const image = event.currentTarget.files[0]
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'sgdiyf4c')
		upload(formData, {
			onSuccess: response => {
				console.log([
					...(typeof data?.documents_urls?.urls === 'object'
						? data.documents_urls.urls
						: []),
					response.secure_url,
				])
				edit(
					{
						id: data?.id,
						request: {
							documents_urls: {
								// @ts-expect-error Проблема со стороны сервера
								urls: [
									...(typeof data?.documents_urls?.urls === 'object'
										? data.documents_urls.urls
										: []),
									response.secure_url,
								],
							},
						},
					},
					{
						onSuccess: () => {
							toast.success('Успешно загружено')
							refetch()
						},
						onError: () => {
							toast.error('Что-то пошло не так, попробуйте позднее')
						},
					},
				)
			},
			onError: error => {
				toast.error('Произошла ошибка')
				console.log(error)
			},
		})
	}

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
				<Container className='justify-self-center pt-10 flex flex-col'>
					<div className='flex gap-x-3'>
						{!data?.is_tourist &&
							profileLinks.map(link => (
								<Link
									className={clsx(
										'px-4 py-2 text-sm border border-[#E9EAE8] rounded-lg font-semibold capitalize',
										pathname === link.href && 'border-green text-green',
									)}
									key={link.id}
									href={link.href}
								>
									{link.name}
								</Link>
							))}
					</div>
					<div className='w-5/12 self-center flex flex-col items-center py-10 md:w-full'>
						<span className='w-32 h-32 relative inline-block'>
							<label
								id='addPhoto'
								className='flex items-center justify-center text-white font-semibold py-3 text-sm outline-none transition-all duration-300 ease-out active:scale-[0.99] z-10 absolute right-0 bottom-0 bg-green p-2 rounded-full hover:scale-[1.05] w-9 h-9 cursor-pointer'
							>
								<input
									disabled={uploading}
									onChange={handleOnChange}
									accept='image/png, image/jpeg'
									type='file'
									className='w-full h-full absolute invisible'
								/>
								{uploading ? (
									<Icon path={mdiLoading} size={0.8} className='animate-spin' />
								) : (
									<Icon color='#fff' path={mdiCamera} size={0.8} />
								)}
							</label>
							<span className='w-[128px] h-[128px] relative overflow-hidden flex items-center rounded-full'>
								<Image
									alt='User photo'
									style={{
										objectFit: 'cover',
									}}
									fill
									className='rounded-full'
									unoptimized
									src={
										data?.photo_url ??
										`https://ui-avatars.com/api/?name=${user?.email}&size=128&font-size=0.55&rounded=true&background=ededed&color=86A545&format=svg`
									}
								/>
							</span>
						</span>
						<p className='font-semibold text-sm text-green capitalize mt-2'>
							{data?.is_verified ? t('verified') : t('unverified')}
						</p>
						<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
							<div className='mt-8 w-full'>
								<Input
									error={errors.fullName?.message}
									{...register('fullName', {
										required: 'Заполните поле',
									})}
									className='mb-5'
									label={'Имя фамилия'}
									defaultValue={data?.name}
									placeholder='Mikhail Petrovich'
									icon={
										<Icon path={mdiAccount} color='#BFBFBF' size={1}></Icon>
									}
								/>
								<Input
									error={errors.email?.message}
									{...register('email', {
										required: 'Заполните поле',
										pattern: {
											value:
												/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
											message: 'Неверный формат email',
										},
									})}
									className='mb-5'
									label={'E-mail'}
									placeholder='info@example.com'
									disabled
									defaultValue={user?.email}
									icon={<Icon path={mdiEmail} color='#BFBFBF' size={1}></Icon>}
								/>
								<Input
									className=''
									error={errors.phone?.message}
									{...register('phone', {
										required: 'Заполните поле',
										pattern: {
											value:
												/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
											message: 'Неверный формат телефона',
										},
									})}
									label={'Номер телефона'}
									placeholder='+7 708 282 72 07'
									defaultValue={data?.phone_number}
									icon={<Icon path={mdiPhone} color='#BFBFBF' size={1}></Icon>}
								/>
							</div>

							{!data?.is_tourist && (
								<>
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
									<>
										<hr className='w-full bg-[rgba(60,60,67,0.36);] h-[0.33px] my-8' />
										<div className='w-full'>
											<p>{t('guideBecomeDocText')}</p>
											<p className='flex gap-x-2 mt-6'>
												<span className='bg-lightDark text-white text-sm w-6 h-6 flex items-center justify-center rounded-full shrink-0'>
													1
												</span>
												Указать ссылку на профиль в одной из социальных сетей (с
												информацией о ваших турах):
											</p>
											<Input
												error={errors.socialLink?.message}
												{...register('socialLink', {
													pattern: {
														value: RegExp(
															/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
														),
														message: 'Неверный формат ссылки',
													},
												})}
												className='mt-6'
												placeholder='Instagram, Facebook или Twitter'
											/>
											{
												// @ts-expect-error Проблема со стороны сервера
												!data?.documents_urls?.urls.length && (
													<p className='flex gap-x-2 mt-6 mb-6'>
														<span className='bg-lightDark text-white text-sm w-6 h-6 flex items-center justify-center rounded-full shrink-0'>
															2
														</span>
														Загрузить следующие документы:
													</p>
												)
											}
											<div className='flex justify-between items-center'>
												<p>
													{t('guideBecomeDocOne')}
													<br />
													{t('guideBecomeDocThree')}
												</p>
												<label className='flex items-center justify-center cursor-pointer rounded-full w-6 h-6 hover:scale-[1.1] shrink-0 text-white font-semibold py-3 text-sm outline-none transition-all duration-300 ease-out active:scale-[0.99] bg-green relative'>
													<input
														type='file'
														className='absolute z-10 w-full h-full hidden'
														onChange={handleUpload}
													/>
													<Icon path={mdiPlus} size={0.8} />
												</label>
											</div>

											<div className='flex flex-row flex-wrap gap-4 items-center mt-6'>
												{
													// @ts-expect-error Ошибка со стороны сервера
													data?.documents_urls?.urls.length != 0 &&
														// @ts-expect-error Ошибка со стороны сервера
														data?.documents_urls?.urls.map((image, index) => (
															<img
																className='rounded-lg'
																key={index}
																src={image}
																width='100px'
																height='100px'
																alt=''
															/>
														))
												}
											</div>
										</div>
									</>
								</>
							)}
							<Button className='mt-8 capitalize'>{t('save')}</Button>
						</form>
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
