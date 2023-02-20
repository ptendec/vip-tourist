import { createProfile } from '@/API/profile.service'
import { Button } from '@/components/UI/Button'
import Checkbox from '@/components/UI/Checkbox'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { mdiEmail, mdiLock } from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { auth } from 'config/firebase'
import 'firebase/auth'
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AuthorizationFields } from 'utilities/interfaces'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}
// TODO: Добавить юридические документы
const Main = () => {
	const { locale } = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<AuthorizationFields>()
	const { t } = useTranslation()
	const { push } = useRouter()
	const { mutate } = useMutation(createProfile)
	const [isTourist, setIsTourist] = useState(true)
	const [isNotify, setIsNotify] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const swiperRef = useRef<SwiperCore>()

	const onInit = (Swiper: SwiperCore): void => {
		swiperRef.current = Swiper
	}
	const onSubmit = (data: AuthorizationFields) => {
		setIsLoading(true)
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(authUser => {
				mutate(
					{
						locale: locale as string,
						request: {
							email: data.email,
							// @ts-expect-error Несоответствие типов
							uid: authUser.user.uid,
							is_tourist: isTourist,
						},
					},
					{
						onSuccess: response => {
							setIsLoading(false)
							response.is_tourist
								? push('/tourist/profile')
								: push('/guide/profile')
						},
					},
				)
			})
			.catch(error => {
				setIsLoading(false)
			})
	}

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider()
		await signInWithPopup(auth, provider)
			.then(authUser => {
				mutate(
					{
						locale: locale as string,
						request: {
							email: authUser.user.email as string,
							// @ts-expect-error Несоответствие типов
							uid: authUser.user.uid,
							is_tourist: isTourist,
						},
					},
					{
						onSuccess: response => {
							setIsLoading(false)
							response.is_tourist
								? push('/tourist/profile')
								: push('/guide/profile')
						},
					},
				)
			})
			.catch(() => {
				console.log('error')
			})
	}

	return (
		<>
			<Head>
				<title>Регистрация</title>
			</Head>
			<Container className='flex flex-row items-center justify-center py-10 lg:block mx-auto'>
				<div className='basis-4/12 lg:basis-full lg:max-w-xl mx-auto'>
					<h1 className='font-semibold text-xl text-center mb-7'>
						Регистрация
					</h1>
					<Button
						className='!bg-white !text-dark rounded-lg border border-gray relative px-6'
						onClick={signInWithGoogle}
					>
						<Image
							src='/images/google.svg'
							alt='Иконка Google'
							width='24'
							height='24'
							className='mr-2'
						/>
						{t('signInWithGoogle')}
					</Button>
					<div className='flex flex-row justify-center items-center my-4 flex-nowrap'>
						<span className='bg-[#D9D9D9] h-[1px] basis-full' />
						<p className='shrink-0 -translate-y-[2px] px-4 basis-auto text-center text-gray text-sm'>
							или
						</p>
						<span className='bg-[#D9D9D9] h-[1px] basis-full' />
					</div>
					<div>
						<p className='text-center mb-4'>{t('chooseAccountType')}</p>
						<div className='flex text-sm gap-x-4 justify-center font-semibold text-center'>
							<span
								className={clsx(
									'px-6 py-5 border-2 block rounded-lg transition-all duration-500 ease-out cursor-pointer',
									isTourist ? 'border-[#86A545]' : 'border-[#BFBFBF]',
								)}
								onClick={() => setIsTourist(true)}
							>
								<span className='relative block'>
									<Image
										src='/images/tourist.png'
										width={48}
										height={48}
										alt='Tourist'
									/>
								</span>
								<span
									className={clsx(
										'mt-3 text-center block',
										isTourist ? 'text-[#86A545]' : 'text-[#BFBFBF]',
									)}
								>
									{t('tourist')}
								</span>
							</span>
							<span
								className={clsx(
									'px-6 py-5 border-2 block rounded-lg transition-all duration-500 ease-out cursor-pointer',
									!isTourist ? 'border-[#86A545]' : 'border-[#BFBFBF]',
								)}
								onClick={() => setIsTourist(false)}
							>
								<span className='relative block'>
									<Image
										src='/images/guide.png'
										width={48}
										height={48}
										alt='Tourist'
									/>
								</span>
								<span
									className={clsx(
										'mt-3 text-center block',
										!isTourist ? 'text-[#86A545]' : 'text-[#BFBFBF]',
									)}
								>
									{t('guide')}
								</span>
							</span>
						</div>
					</div>
					<form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
						<Input
							{...register('email', {
								required: 'Заполните поле',
								pattern: {
									value:
										/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: 'Неверный формат email',
								},
							})}
							className='mb-5'
							error={errors.email?.message}
							placeholder='Введите e-mail'
							label='E-mail'
							icon={<Icon color='#BFBFBF' path={mdiEmail} size={1} />}
						/>
						<Input
							{...register('password', {
								required: 'Заполните поле',
								validate: value => {
									if (value.length < 8) {
										return 'Пароль должен быть не менее 8 символов'
									}
									if (value === value.toLowerCase()) {
										return 'Пароль должен содержать заглавную букву'
									}
									if (value === value.toUpperCase()) {
										return 'Пароль должен содержать строчную букву'
									}
									if (!/\d/.test(value)) {
										return 'Пароль должен содержать одну цифру'
									}
								},
							})}
							error={errors.password?.message}
							type='password'
							placeholder='Введите пароль'
							label={`${t('password')}`}
							icon={<Icon color='#BFBFBF' path={mdiLock} size={1} />}
						/>
						<div className='flex gap-x-3 mt-7 '>
							<Checkbox
								checked={isNotify}
								onChange={state => setIsNotify(state)}
							/>
							<div onClick={() => setIsNotify(prevState => !prevState)}>
								<p className='font-semibold text-lightDark'>
									{t('receiveTips')}
								</p>
								<span className='text-[10px] leading-[13px] inline-block mt-2'>
									{t('weSendText')}
									<Link href='/' className='font-semibold'>
										<br /> {t('privacyPolicy')}
									</Link>
								</span>
							</div>
						</div>
						<Button disabled={isLoading} isLoading={isLoading} className='mt-7'>
							{t('signUp')}
						</Button>
						<span className='text-[10px] text-center block mt-2'>
							{t('byProceedingYouConfirm')}{' '}
							<Link href='/' className='font-semibold'>
								{t('termsOfUse')}
							</Link>
						</span>
						<p className='font-semibold text-lightDark text-sm mt-7 self-center inline-block'>
							{t('alreadyHaveAccount')}?{' '}
							<Link href='/auth/authorization' className='text-green'>
								{t('logIn')}
							</Link>
						</p>
					</form>
				</div>
				<div className='basis-6/12 lg:hidden overflow-hidden h-[calc(100vh_-_100px)] bg-[#FBFBFB] rounded-2xl flex items-center'>
					<Swiper
						onInit={onInit}
						centeredSlides={true}
						mousewheel={{ forceToAxis: false, invert: true }}
						autoplay={{
							delay: 2000,
							disableOnInteraction: true,
						}}
						modules={[Pagination, Autoplay]}
						pagination={{
							dynamicBullets: true,
						}}
						spaceBetween={10}
						slidesPerView={1}
						className='rounded-t-xl w-full'
					>
						<SwiperSlide className='mb-10'>
							<Image
								className='transition-all duration-300 ease-in-out w-full h-60'
								alt='Slides'
								src='/images/slide_1.svg'
								width={300}
								height={225}
							/>
							<p className='text-center font-semibold text-xl mt-10 mb-2'>
								{t('tours')}
							</p>
							<span className='text-lightDark text-center block'>
								Исследуйте мир, находя туры по всему миру!
							</span>
						</SwiperSlide>
						<SwiperSlide className='mb-10'>
							<Image
								className='transition-all duration-300 ease-in-out w-full h-60'
								alt='Slides'
								src='/images/slide_2.svg'
								width={300}
								height={225}
							/>
							<p className='text-center font-semibold text-xl mt-10 mb-2'>
								{t('tickets')}
							</p>
							<span className='text-lightDark text-center block'>
								Покупайте билеты и пользуйтесь QR кодом для максимального
								удобства
							</span>
						</SwiperSlide>
						<SwiperSlide className='mb-10'>
							<Image
								className='transition-all duration-300 ease-in-out w-full h-60'
								alt='Slides'
								src='/images/slide_3.svg'
								width={300}
								height={225}
							/>
							<p className='text-center font-semibold text-xl mt-10 mb-2'>
								{t('guide')}
							</p>
							<span className='text-lightDark text-center block'>
								Вы можете стать гидом и начать продавать ваши сообственные туры!
							</span>
						</SwiperSlide>
					</Swiper>
				</div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
