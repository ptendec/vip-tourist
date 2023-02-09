import { UploadImage } from '@/components/Icons/Upload'
import { Button } from '@/components/UI/Button'
import { mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'

export const ImageStep = () => {
	const { t } = useTranslation()

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>{t('photos')}</h2>
			<div>
				<span className='block mx-auto w-max my-20'>
					<UploadImage />
				</span>
				<div className='flex justify-between mt-4'>
					<p>{t('previewImage')}</p>
					<Button className='rounded-full w-6 h-6 hover:scale-[1.1]'>
						<Icon path={mdiPlus} size={0.8} />
					</Button>
				</div>
				<div className='flex justify-between mt-4'>
					<p>{t('Фотогалерея')}</p>
					<Button className='rounded-full w-6 h-6 hover:scale-[1.1]'>
						<Icon path={mdiPlus} size={0.8} />
					</Button>
				</div>
				<div className='flex justify-between mt-4'>
					<p>{t('Фотография автомобиля')}</p>
					<Button className='rounded-full w-6 h-6 hover:scale-[1.1]'>
						<Icon path={mdiPlus} size={0.8} />
					</Button>
				</div>
			</div>
		</>
	)
}
