import { Input } from '@/components/UI/Input'
import { useTranslation } from 'next-i18next'

export const AdditionalStep = () => {
	const { t } = useTranslation()
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
				/>
				<Input
					label={t('enterIncludedNew') as string}
					className='mb-5'
					placeholder={t('Например, стаканы и холодная вода') as string}
				/>
				<Input
					label={t('enterNotIncludedNew') as string}
					className='mb-5'
					placeholder={t('Например, трансфер') as string}
				/>
				<Input
					label={t('prohibs') as string}
					className='mb-5'
					placeholder={t('Например, алкоголь и курение  ') as string}
				/>
				<Input
					label={t('notesAboutFreeTour') as string}
					className='mb-5'
					placeholder={t('Любая дополнительная информация') as string}
				/>
			</div>
		</>
	)
}
