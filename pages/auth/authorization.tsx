import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import Icon from '@mdi/react'
import { mdiEmail, mdiLock } from '@mdi/js'
import { AuthorizationFields } from 'utilities/interfaces'
import { useForm } from 'react-hook-form'

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			...(await serverSideTranslations(context.locale as string, ['common'])),
		},
	}
}

const Main = () => {
	const { locale } = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<AuthorizationFields>()

	const onSubmit = (data: AuthorizationFields) => {
		console.log(data)
	}

	return (
		<>
			<Head>
				<title>Авторизация</title>
			</Head>
			<Container className='flex flex-row items-center h-screen justify-around'>
				<div className='basis-4/12'>
					<h1 className='font-semibold text-xl text-center mb-7'>
						Вход в аккаунт
					</h1>
					<Button className='!bg-white !text-dark rounded-lg border border-gray relative px-6'>
						<Image
							src='/images/google.svg'
							alt='Иконка Google'
							width='24'
							height='24'
							className='mr-2'
						/>
						Войти с помощью Google аккаунта
					</Button>
					<div className='flex flex-row justify-center items-center my-7 flex-nowrap'>
						<span className='bg-[#D9D9D9] h-[1px] basis-full' />
						<p className='shrink-0 -translate-y-[2px] px-4 basis-auto text-center text-gray text-sm'>
							или
						</p>
						<span className='bg-[#D9D9D9] h-[1px] basis-full' />
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
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
							label='Пароль'
							icon={<Icon color='#BFBFBF' path={mdiLock} size={1} />}
						/>
						<Button className='mt-7'>Войти в аккаунт</Button>
					</form>
				</div>
				<div className='basis-5/12'></div>
			</Container>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
