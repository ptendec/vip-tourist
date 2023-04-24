import NoSSR from '@/components/Common/NoSSR'
import { Button } from '@/components/UI/Button'
import { Container } from '@/components/UI/Container'
import { Input } from '@/components/UI/Input'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { Layout } from '@/modules/Layout'
import { Wrapper } from '@/modules/Layout/Wrapper'
import { AdditionalFields } from '@/utilities/interfaces'
import clsx from 'clsx'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'
import { useEditTourStore } from 'store/edit'

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
		setValue,
		trigger,
		formState: { errors, isValid },
	} = useForm<AdditionalFields>()
	const { t } = useTranslation()
	const { user } = useFirebaseAuth()
	const { query, push } = useRouter()
	const { tour, editTour, removeTour } = useEditTourStore()

	useEffect(() => {
		setValue('prerequisites', tour?.prerequisites)
		setValue('included', tour?.included)
		setValue('not_included', tour?.not_included)
		setValue('prohibitions', tour?.prohibitions)
		setValue('note', tour?.note)

		if (tour?.prerequisites) trigger('prerequisites')
		if (tour?.included) trigger('included')
		if (tour?.not_included) trigger('not_included')
		if (tour?.prohibitions) trigger('prohibitions')
		if (tour?.note) trigger('note')
	}, [])

	const onSubmit = (data: AdditionalFields) => {
		editTour({
			...tour,
			...data,
			id: query.id as string,
		})
	}

	return (
		<>
			<Head>
				<title>{`${t('tour')} | VipTourist`}</title>
			</Head>
			<NoSSR>
				<Tooltip
					noArrow
					delayShow={200}
					content='Сохранить на время'
					anchorSelect='save'
					place='bottom'
				/>
				<Wrapper>
					<Container className='justify-self-center pt-10 flex flex-col mx-auto min-h-screen'>
						<div className={clsx('flex justify-between')}>
							<h1 className='font-semibold text-lg'>{t('addTour')}</h1>
							<div className='flex gap-x-4'>
								<Button
									className='!bg-[#D84343] text-white h-8 px-3'
									onClick={() => {
										removeTour(query.id as string)
										push('/guide/account', undefined, { shallow: true })
									}}
								>
									{t('cancel')}
								</Button>
								<Button
									id='save'
									className='px-3 h-8'
									onClick={() => {
										toast.success('Изменения сохранены')
										push('/guide/account', undefined, { shallow: true })
									}}
								>
									{t('save')}
								</Button>
							</div>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='w-5/12 my-8 mx-auto rounded-lg p-6 border-lightGray border lg:w-8/12 md:w-full'>
								<h2 className='font-semibold text-center block mb-5'>
									{t('additional')}
								</h2>
								<div>
									<Input
										className='mb-5'
										label={t('prerequisites')}
										placeholder={t('prerequisitesNew') as string}
										{...register('prerequisites')}
										error={errors.prerequisites?.message}
									/>
									<Input
										label={t('enterIncludedNew') as string}
										className='mb-5'
										placeholder={
											t('Например, стаканы и холодная вода') as string
										}
										{...register('included')}
										error={errors.included?.message}
									/>
									<Input
										label={t('enterNotIncludedNew') as string}
										className='mb-5'
										placeholder={t('Например, трансфер') as string}
										{...register('not_included')}
									/>
									<Input
										label={t('prohibs') as string}
										className='mb-5'
										placeholder={t('Например, алкоголь и курение  ') as string}
										{...register('prohibitions')}
										error={errors.prohibitions?.message}
									/>
									<Input
										label={t('notesAboutFreeTour') as string}
										className='mb-5'
										defaultValue={tour?.note}
										placeholder={t('Любая дополнительная информация') as string}
										{...register('note')}
										error={errors.note?.message}
									/>
								</div>
							</div>
							<div
								className={clsx(
									'w-full flex mt-auto items-center h-[72px] border-t border-lightGray',
								)}
							>
								<Button
									className='w-max px-10 sm:px-3'
									type='button'
									onClick={() => {
										push(
											{
												pathname: 'city',
												query: { id: query.id },
											},
											undefined,
											{ shallow: true },
										)
									}}
								>
									{t('back')}
								</Button>
								<span className='block mx-auto font-bold text-sm uppercase'>
									{t('step')} 3 {t('izz')} {6}
								</span>
								<Button
									type='submit'
									disabled={!isValid}
									onClick={() => {
										push(
											{
												pathname: 'pricing',
												query: { id: query.id },
											},
											undefined,
											{ shallow: true },
										)
									}}
									className='w-max px-10 truncate sm:px-3'
								>
									{t('next')}
								</Button>
							</div>
						</form>
					</Container>
				</Wrapper>
			</NoSSR>
		</>
	)
}

Main.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Main
