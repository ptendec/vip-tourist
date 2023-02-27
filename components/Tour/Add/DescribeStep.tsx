import { Input } from '@/components/UI/Input'
import { MultiSelect } from '@/components/UI/MultiSelect'
import { Textarea } from '@/components/UI/Textarea'
import { ListItem } from '@/utilities/interfaces'
import { langList, staticCategories } from '@/utilities/static'
import { isTourExists } from '@/utilities/utilities'
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
					defaultValue={existingTour?.description}
					label={t('desc') as string}
					className='mb-5 h-10'
					placeholder={t('enterTourName') as string}
					onChange={event => {
						editTour(query.id as string, {
							description: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<MultiSelect
					className='mt-2'
					list={staticCategories}
					onChange={function (item: ListItem[]): void {
						null
					}}
					label={t('categories')}
				/>
				<div className='flex justify-between mt-5'>
					<Input
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
						label='Кол-во мест'
						placeholder='17'
						className='basis-[calc(50%_-_8px)]'
					/>
				</div>
				<MultiSelect
					className='mt-2'
					list={langList}
					onChange={function (item: ListItem[]): void {
						null
					}}
					label={t('chooseLanguages')}
				/>
			</div>
		</>
	)
}
