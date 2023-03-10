import { Input } from '@/components/UI/Input'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEditTourStore } from 'store/edit'

export const AdditionalStep = () => {
	const { t } = useTranslation()
	const { query } = useRouter()
	const { addTour, tour, editTour } = useEditTourStore()

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>
				{t('additional')}
			</h2>
			<div>
				<Input
					className='mb-5'
					label={t('prerequisites')}
					defaultValue={tour?.prerequisites}
					placeholder={t('enterTourName') as string}
					onChange={event => {
						editTour({
							...tour,
							prerequisites: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('enterIncludedNew') as string}
					className='mb-5'
					defaultValue={tour?.included}
					placeholder={t('Например, стаканы и холодная вода') as string}
					onChange={event => {
						editTour({
							...tour,
							included: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('enterNotIncludedNew') as string}
					className='mb-5'
					defaultValue={tour?.not_included}
					placeholder={t('Например, трансфер') as string}
					onChange={event => {
						editTour({
							...tour,
							not_included: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('prohibs') as string}
					className='mb-5'
					defaultValue={tour?.prohibitions}
					placeholder={t('Например, алкоголь и курение  ') as string}
					onChange={event => {
						editTour({
							...tour,
							prohibitions: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Input
					label={t('notesAboutFreeTour') as string}
					className='mb-5'
					defaultValue={tour?.note}
					placeholder={t('Любая дополнительная информация') as string}
					onChange={event => {
						editTour({
							...tour,
							note: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
			</div>
		</>
	)
}
