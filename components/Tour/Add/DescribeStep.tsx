import { Categories } from '@/components/UI/Categories'
import { Input } from '@/components/UI/Input'
import { MultiSelect } from '@/components/UI/MultiSelect'
import { Textarea } from '@/components/UI/Textarea'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import { ListItem } from '@/utilities/interfaces'
import { langList, staticCategories } from '@/utilities/static'
import {
	getAddedCategories,
	getAddedLanguages,
	getNotAddedCategories,
	removeAllCategories,
} from '@/utilities/utilities'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Tour, useDraftStore } from 'store/draft'

export const DescribeStep = () => {
	const { t } = useTranslation()
	const { query } = useRouter()
	const { user } = useFirebaseAuth()
	const { tours, editTour } = useDraftStore()
	const [existingTour, setExistingTour] = useState<Tour | undefined>(
		tours.find(tour => tour.id === (query.id as string)),
	)

	useEffect(() => {
		setExistingTour(tours.find(tour => tour.id === (query.id as string)))
	}, [tours.find(tour => tour.id === (query.id as string))])

	useEffect(() => {
		if (existingTour)
			editTour(query.id as string, {
				...existingTour,
				...getNotAddedCategories(existingTour),
				id: query.id as string,
			})
	}, [])

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>
				{t('describeUrTour')}
			</h2>
			<div>
				<Input
					className='mb-5'
					label='Название'
					placeholder={t('enterTourName') as string}
					defaultValue={existingTour?.name}
					onChange={event => {
						editTour(query.id as string, {
							name: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Textarea
					value={existingTour?.description}
					label={t('desc') as string}
					className='mb-5 h-10'
					placeholder={t('desc') as string}
					onChange={event => {
						editTour(query.id as string, {
							description: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Categories
					className='mt-2'
					chosenItems={getAddedCategories(existingTour)}
					list={staticCategories}
					onChange={(items: ListItem[]) => {
						if (items.length === 0 && existingTour) {
							editTour(query.id as string, {
								...removeAllCategories({
									...existingTour,
								}),
								id: query.id as string,
							})
						} else {
							if (existingTour) {
								const newCategories = { ...existingTour }
								staticCategories.forEach(category => {
									if (
										Object.entries(existingTour).find(
											elem =>
												elem[0] ===
												items.find(item => item.value === category.value)
													?.value,
										)
									) {
										newCategories[category.value] = true
									} else {
										newCategories[category.value] = false
									}
								})
								editTour(query.id as string, {
									...newCategories,
									id: query.id as string,
									name: existingTour?.name,
									description: existingTour?.description,
								})
							}
						}
					}}
					label={t('categories')}
				/>
				<span
					key={JSON.stringify(existingTour)}
					className='capitalize text-xs font-medium'
				>
					{getAddedCategories(existingTour)
						.map(category => t(category.name))
						.join(', ')}
				</span>
				<div className='flex justify-between mt-5'>
					<Input
						defaultValue={existingTour?.duration}
						label='Длительность, ч *'
						placeholder='4'
						className='basis-[calc(50%_-_8px)]'
						onChange={event => {
							editTour(query.id as string, {
								duration: event.currentTarget.value,
								id: query.id as string,
							})
						}}
					/>
					<Input
						defaultValue={existingTour?.placesCount}
						label={t('seatsAvailable')}
						placeholder='17'
						className='basis-[calc(50%_-_8px)]'
						onChange={event => {
							editTour(query.id as string, {
								placesCount: Number(event.currentTarget.value),
								id: query.id as string,
							})
						}}
					/>
				</div>
				<MultiSelect
					chosenItems={getAddedLanguages(existingTour?.languages)}
					className='mt-2'
					list={langList}
					onChange={(items: ListItem[]) => {
						editTour(query.id as string, {
							languages: items.map(items => items.name).join('|'),
							id: query.id as string,
						})
					}}
					label={t('chooseLanguages')}
				/>
				<span
					key={JSON.stringify(existingTour?.languages)}
					className='capitalize text-xs font-medium'
				>
					{existingTour?.languages
						?.split('|')
						.map(text => t(text))
						.join(', ')}
				</span>
			</div>
		</>
	)
}
