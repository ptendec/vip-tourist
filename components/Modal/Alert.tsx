import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { mdiMessageAlert } from '@mdi/js'
import Icon from '@mdi/react'

interface Props {
	isVisible: boolean
	onClose: () => void
}

export const Alert = ({ isVisible, onClose }: Props) => {
	return (
		<Modal className='max-w-lg p-6' isVisible={isVisible} onClose={onClose}>
			<Icon
				path={mdiMessageAlert}
				className='block mx-auto rounded-lg'
				color='#D84343'
				size={1.8}
			/>
			<p className='font-semibold text-xl text-center mb-4'>Внимание</p>
			<span className='mb-3 text-sm inline-block'>
				На данный момент идёт работа по наполнению приложения контентом. Это
				означает, что гиды сейчас могут размещать свои экскурсии.{' '}
			</span>
			<span className='mb-5 text-sm inline-block'>
				После наполнения будет запущена возможность оплаты и покупки туров. По
				запуску возможности оплаты мы обязательно Вас уведомим!
			</span>
			<Button className='outline-none' onClick={onClose}>
				Понятно
			</Button>
		</Modal>
	)
}
