import Checkbox from '@/components/UI/Checkbox'
import { Input } from '@/components/UI/Input'
import { isTourExists } from '@/utilities/utilities'
import { mdiAccount, mdiBabyFaceOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDraftStore } from 'store/draft'

export const PricingStep = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore()

	const existingTour = isTourExists(query.id as string, tours)

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
				name: '',
			})
		}
	}, [query.id])

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
						defaultValue={existingTour?.adult_price}
						onChange={event => {
							editTour(query.id as string, {
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
						defaultValue={existingTour?.child_price}
						onChange={event => {
							editTour(query.id as string, {
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
						checked={existingTour?.withTransfer ?? false}
						onChange={event => {
							editTour(query.id as string, {
								withTransfer: !existingTour?.withTransfer,
								id: query.id as string,
							})
						}}
					/>
				</label>
				<span className='block bg-gray h-[0.33px]' />
			</div>
		</>
	)
}
