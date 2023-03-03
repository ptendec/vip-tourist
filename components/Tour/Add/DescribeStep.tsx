import { Categories } from '@/components/UI/Categories'
import { Input } from '@/components/UI/Input'
import { MultiSelect } from '@/components/UI/MultiSelect'
import { Textarea } from '@/components/UI/Textarea'
import { ListItem } from '@/utilities/interfaces'
import { langList, staticCategories } from '@/utilities/static'
import {
	getAddedCategories,
	getAddedLanguages,
	isTourExists,
} from '@/utilities/utilities'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDraftStore } from 'store/draft'

export const DescribeStep = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore(state => state)

	const existingTour = isTourExists(query.id as string, tours)

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
			})
		}
	}, [query.id])
	console.log(existingTour?.languages)
	console.log(getAddedLanguages(existingTour?.languages))
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
						editTour(query.id as string, {
							...items.reduce((accumulator, value) => {
								return { ...accumulator, [value.value]: true }
							}, {}),
							id: query.id as string,
						})
					}}
					label={t('categories')}
				/>
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
						label='Кол-во мест'
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
			</div>
		</>
	)
}
