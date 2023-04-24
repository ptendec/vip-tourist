import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { mdiMessageAlert } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'

interface Props {
	isVisible: boolean
	onClose: () => void
}

export const Alert = ({ isVisible, onClose }: Props) => {
	const { t } = useTranslation()
	return (
		<Modal className='max-w-lg p-6' isVisible={isVisible} onClose={onClose}>
			<Icon
				path={mdiMessageAlert}
				className='block mx-auto rounded-lg'
				color='#D84343'
				size={1.8}
			/>
			<p className='font-semibold text-xl text-center mb-4'>{t('alert')}</p>
			<span className='mb-3 text-sm inline-block'>{t('freshTag1')}</span>
			<span className='mb-5 text-sm inline-block'>{t('freshTag2')}</span>
			<Button className='outline-none' onClick={onClose}>
				{t('ok')}
			</Button>
		</Modal>
	)
}
