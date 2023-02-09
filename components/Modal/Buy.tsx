import { components } from '@/API/types/api.types'
import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { mdiWeb } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import { Tooltip } from 'react-tooltip'

interface Props {
	isVisible: boolean
	onClose: () => void
	tour: components['schemas']['Tour']
}

export const Buy = ({ isVisible, onClose, tour }: Props) => {
	const { t } = useTranslation()

	return (
		<>
			<Modal className='max-w-lg p-6' isVisible={isVisible} onClose={onClose}>
				<p className='font-semibold text-xl text-center mb-4'>Оплата</p>
				<div className='gap-y-3.5 flex flex-col'>
					<div className='flex gap-x-2 leading-none mb-1'>
						<Icon path={mdiWeb} size={1} />
						<div>
							<p className='text-sm font-semibold '>{tour.name}</p>
							<span className='text-[10px] leading-none text-gray'>
								{t('Название тура')}
							</span>
						</div>
					</div>
					<div className='flex gap-x-2 leading-none mb-1'>
						<Icon path={mdiWeb} size={1} />
						<div>
							<p className='text-sm font-semibold '>{tour.name}</p>
							<span className='text-[10px] leading-none text-gray'>
								{t('Название тура')}
							</span>
						</div>
					</div>
					<div className='flex gap-x-2 leading-none mb-1'>
						<Icon path={mdiWeb} size={1} />
						<div>
							<p className='text-sm font-semibold '>{tour.name}</p>
							<span className='text-[10px] leading-none text-gray'>
								{t('Название тура')}
							</span>
						</div>
					</div>
					<div className='flex gap-x-2 leading-none mb-1'>
						<Icon path={mdiWeb} size={1} />
						<div>
							<p className='text-sm font-semibold '>{tour.name}</p>
							<span className='text-[10px] leading-none text-gray'>
								{t('Название тура')}
							</span>
						</div>
					</div>
				</div>
				<Button id='next' className='outline-none mt-4'>
					Далее
				</Button>
			</Modal>
		</>
	)
}
