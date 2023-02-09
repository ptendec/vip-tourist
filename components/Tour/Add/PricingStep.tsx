import Checkbox from '@/components/UI/Checkbox'
import { Input } from '@/components/UI/Input'
import { mdiAccount, mdiBabyFaceOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const PricingStep = () => {
	const { t } = useTranslation()

	const [isFree, setIsFree] = useState(false)

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>
				{t('ticketPrice')}
			</h2>
			<p className='text-sm mb-5'>{t('usdTag')}</p>
			<div>
				<p className='flex gap-x-2.5 font-semibold text-sm items-center'>
					<Icon path={mdiAccount} size={1} />
					{t('adultPrice')}
				</p>
				<div className='flex justify-between mt-3'>
					<Input
						label={t('withoutComission')}
						placeholder='4'
						className='basis-[calc(50%_-_8px)]'
					/>
					<Input
						label={t('withComission')}
						placeholder='17'
						className='basis-[calc(50%_-_8px)]'
					/>
				</div>
				<p className='flex gap-x-2.5 font-semibold text-sm items-center mt-5'>
					<Icon path={mdiBabyFaceOutline} size={1} />
					{t('childPrice')}
				</p>
				<div className='flex justify-between mt-3 mb-5'>
					<Input
						label={t('withoutComission')}
						placeholder='4'
						className='basis-[calc(50%_-_8px)]'
					/>
					<Input
						label={t('withComission')}
						placeholder='17'
						className='basis-[calc(50%_-_8px)]'
					/>
				</div>
				<span className='block bg-gray h-[0.33px]' />
				<label className='flex justify-between items-center text-sm font-semibold my-4'>
					{t('freeTour')}
					<Checkbox
						checked={isFree}
						onChange={() => setIsFree(prevState => !prevState)}
					/>
				</label>
				<span className='block bg-gray h-[0.33px]' />
				<label className='flex justify-between items-center text-sm font-semibold my-4'>
					{t('transfer')}
					<Checkbox
						checked={isFree}
						onChange={() => setIsFree(prevState => !prevState)}
					/>
				</label>
				<span className='block bg-gray h-[0.33px]' />
				<label className='flex justify-between items-center text-sm font-semibold my-4'>
					{t('Трансфер включен в стоимость')}
					<Checkbox
						checked={isFree}
						onChange={() => setIsFree(prevState => !prevState)}
					/>
				</label>
			</div>
		</>
	)
}
