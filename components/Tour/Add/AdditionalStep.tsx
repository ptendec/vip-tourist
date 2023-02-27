import { Input } from '@/components/UI/Input'
import { isTourExists } from '@/utilities/utilities'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDraftStore } from 'store/draft'

export const AdditionalStep = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore(state => state)

	const existingTour = isTourExists(query.id as string, tours)

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
				name: '',
			})
		}
	}, [query.id])

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>
				{t('additional')}
			</h2>
			<div>
				<Input
					className='mb-5'
					label={t('prerequisites')}
					placeholder={t('enterTourName') as string}
					onChange={event => {
						editTour(query.id as string, {
							prerequisites: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('enterIncludedNew') as string}
					className='mb-5'
					placeholder={t('Например, стаканы и холодная вода') as string}
					onChange={event => {
						editTour(query.id as string, {
							included: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('enterNotIncludedNew') as string}
					className='mb-5'
					placeholder={t('Например, трансфер') as string}
					onChange={event => {
						editTour(query.id as string, {
							not_included: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('prohibs') as string}
					className='mb-5'
					placeholder={t('Например, алкоголь и курение  ') as string}
					onChange={event => {
						editTour(query.id as string, {
							prohibitions: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('notesAboutFreeTour') as string}
					className='mb-5'
					placeholder={t('Любая дополнительная информация') as string}
					onChange={event => {
						editTour(query.id as string, {
							note: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
			</div>
		</>
	)
}
