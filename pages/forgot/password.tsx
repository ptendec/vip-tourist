import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { Layout } from '@/modules/Layout'
import { mdiChevronLeft, mdiEmail } from '@mdi/js'
import Icon from '@mdi/react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthorizationFields } from 'utilities/interfaces'

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
	} = useForm<AuthorizationFields>()
	const { t } = useTranslation()

	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = (data: AuthorizationFields) => {
		setIsLoading(true)
		null
	}

	return (
		<>
			<Head>
				<title>Забыл пароль</title>
			</Head>
			<Container className='flex flex-row items-center h-screen justify-around'>
				<div className='basis-4/12'>
					<div className='flex'>
						<Link
							href='/auth/authorization'
							className='rounded-full p-1.5 shadow-md transition-all duration-600 ease-out hover:-translate-x-[2px] justify-self-start w-8 h-8 flex items-center'
						>
							<Icon path={mdiChevronLeft} size={1} color='#3B3F32' />
						</Link>
						<h1 className='font-semibold text-xl text-center mb-7 justify-self-center flex-grow'>
							{t('forgotPassword')}
						</h1>
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

						<Button isLoading={isLoading} disabled={isLoading} className='mt-7'>
							{t('signUp')}
						</Button>
						<div className='flex gap-x-3 mt-5 '>
							<div>
								<span className='text-sm text-lightDark'>
									{t('sendLinkToVerify')}.
								</span>
							</div>
						</div>
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
