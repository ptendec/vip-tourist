import Checkbox from '@/components/UI/Checkbox'
import { Input } from '@/components/UI/Input'
import { mdiAccount, mdiBabyFaceOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEditTourStore } from 'store/edit'

export const PricingStep = () => {
	const { t } = useTranslation()
	const { query } = useRouter()
	const { tour, editTour } = useEditTourStore()

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>
				{t('ticketPrice')}
			</h2>
			<p className='text-sm mb-5'>{t('usdTag')}</p>
			<div>
				<div className='flex justify-between mt-3'>
					<Input
						icon={<Icon path={mdiAccount} size={1} />}
						label={t('adultPrice')}
						placeholder='129'
						className='basis-[calc(50%_-_8px)]'
						type='number'
						defaultValue={tour?.adult_price}
						onChange={event => {
							editTour({
								...tour,
								adult_price: Number(event.currentTarget.value),
								id: query.id as string,
							})
						}}
					/>
					<Input
						icon={<Icon path={mdiBabyFaceOutline} size={1} />}
						label={t('childPrice')}
						placeholder='23'
						className='basis-[calc(50%_-_8px)]'
						defaultValue={tour?.child_price}
						onChange={event => {
							editTour({
								...tour,
								child_price: Number(event.currentTarget.value),
								id: query.id as string,
							})
						}}
					/>
				</div>
				<div className='flex justify-between mt-3 mb-5'></div>

				<span className='block bg-gray h-[0.33px]' />
				<label className='flex justify-between items-center text-sm font-semibold my-4'>
					{t('transfer')}
					<Checkbox
						checked={tour?.withTransfer ?? false}
						onChange={event => {
							editTour({
								...tour,
								withTransfer: !tour?.withTransfer,
								id: query.id as string,
							})
						}}
					/>
				</label>
				<span className='block bg-gray h-[0.33px]' />
				<label className='flex justify-between items-center text-sm font-semibold my-4'>
					{t('Трансфер включен в стоимость')}
					<Checkbox
						checked={!tour?.onlyTransfer ?? false}
						onChange={event => {
							editTour({
								...tour,
								onlyTransfer: !tour?.onlyTransfer,
								id: query.id as string,
							})
						}}
					/>
				</label>
			</div>
		</>
	)
}
