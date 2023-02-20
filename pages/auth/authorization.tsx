import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { mdiEmail, mdiLock } from '@mdi/js'
import Icon from '@mdi/react'
import { auth } from 'config/firebase'
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
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

const Main = () => {
	const { locale, push } = useRouter()
	const { t } = useTranslation()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<AuthorizationFields>()

	const swiperRef = useRef<SwiperCore>()

	const onInit = (Swiper: SwiperCore): void => {
		swiperRef.current = Swiper
	}

	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = (data: AuthorizationFields) => {
		setIsLoading(true)
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then(authUser => {
				setIsLoading(false)
				push('/')
			})
			.catch(error => {
				console.log('error')
			})
	}

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider()
		await signInWithPopup(auth, provider)
			.then(authUser => {
				console.log('logged_in')
			})
			.catch(() => {
				console.log('error')
			})
	}

	return (
		<>
			<Head>
				<title>Авторизация</title>
			</Head>
			<Container className='flex flex-row items-center h-screen justify-around mx-auto'>
				<div className='basis-4/12 lg:basis-full'>
					<h1 className='font-semibold text-xl text-center mb-7'>
						{t('login')}
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
					<div className='flex flex-row justify-center items-center my-7 flex-nowrap'>
						<span className='bg-[#D9D9D9] h-[1px] basis-full' />
						<p className='shrink-0 -translate-y-[2px] px-4 basis-auto text-center text-gray text-sm'>
							или
						</p>
						<span className='bg-[#D9D9D9] h-[1px] basis-full' />
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
							placeholder={`${t('enterPassword')}`}
							label={`${t('password')}`}
							icon={<Icon color='#BFBFBF' path={mdiLock} size={1} />}
						/>
						<Link
							href='/forgot/password'
							className='font-semibold text-sm text-green inline-block mt-2 self-end'
						>
							{t('forgotPassword')}
						</Link>
						<Button isLoading={isLoading} className='mt-5'>
							{t('signInWithEmail')}
						</Button>
						<p className='font-semibold text-lightDark text-sm mt-7 mx-auto'>
							{t('dontHaveAccount')}{' '}
							<Link href='/auth/registration' className='text-green'>
								{t('signUp')}
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
