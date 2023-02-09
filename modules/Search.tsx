import { Input } from '@/components/UI/Input'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

export const Search = () => {
	const { t } = useTranslation()

	return (
		<div className='w-full'>
			<span className='relative h-40 w-full inline-block'>
				<Image fill src='/images/demo.png' alt={''} />
			</span>
			<div className='mt-8 flex flex-row gap-3 '>
				<Input
					className='basis-full'
					icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
					placeholder={`${t('lookCityTourNew')}`}
				/>
			</div>
		</div>
	)
}
