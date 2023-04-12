import { mdiSquareRoundedBadge, mdiWeb } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/router'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { Button } from '../UI/Button'

interface Props {
	isVisible: boolean
	onClose: () => void
}

export const InstallApp = ({ isVisible, onClose }: Props) => {
	const { push } = useRouter()
	return (
		<BottomSheet
			className='max-w-lg hidden xs:block '
			open={isVisible}
			onDismiss={onClose}
		>
			<div className='px-4 mb-20'>
				<p className='font-semibold'>Скачать приложение</p>
				<div className='flex flex-row justify-between items-center my-4'>
					<p className='flex gap-x-2 items-center'>
						<Icon path={mdiWeb} size={1} />
						Браузер
					</p>
					<Button className='w-max px-3' onClick={onClose}>
						Продолжить
					</Button>
				</div>
				<div className='flex flex-row justify-between items-center my-4'>
					<p className='flex gap-x-2 items-center'>
						<Icon path={mdiSquareRoundedBadge} size={1} />
						Приложение
					</p>
					<Button
						className='w-max px-3'
						onClick={() => {
							push('/download')
						}}
					>
						Скачать
					</Button>
				</div>
			</div>
		</BottomSheet>
	)
}
