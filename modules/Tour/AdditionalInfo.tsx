import { components } from '@/API/types/api.types'
import { Article } from '@/components/Tour/Article'
import { useTranslation } from 'next-i18next'

interface Props {
	tour: components['schemas']['Tour']
}

export const AdditionalInfo = ({ tour }: Props) => {
	const { t } = useTranslation()
	return (
		<div className='mt-8'>
			<Article title={t('Что включено')} description={tour.included} />
			<div className='my-8 w-full h-[1px] bg-lightGray' />
			<Article title={t('Возьмите с собой')} description={tour.not_included} />
			<div className='my-8 w-full h-[1px] bg-lightGray' />
			<Article title={t('Важная информация')} description={tour.note} />
			<div className='my-8 w-full h-[1px] bg-lightGray' />
		</div>
	)
}
