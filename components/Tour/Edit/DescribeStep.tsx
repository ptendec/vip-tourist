import { Categories } from '@/components/UI/Categories'
import { Input } from '@/components/UI/Input'
import { MultiSelect } from '@/components/UI/MultiSelect'
import { Textarea } from '@/components/UI/Textarea'
import { ListItem } from '@/utilities/interfaces'
import { langList, staticCategories } from '@/utilities/static'
import { getAddedCategories, getAddedLanguages } from '@/utilities/utilities'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEditTourStore } from 'store/edit'

export const DescribeStep = () => {
	const { t } = useTranslation()
	const { query } = useRouter()
	const { tour, editTour } = useEditTourStore()

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
					defaultValue={tour?.name}
					onChange={event => {
						editTour({
							...tour,
							name: event.currentTarget.value,
							id: query.id as string,
						})
					}}
				/>
				<Textarea
					value={tour?.description}
					label={t('desc') as string}
					className='mb-5 h-10'
					placeholder={t('desc') as string}
					onChange={event => {
						editTour({
							...tour,
							description: event.currentTarget.value,

							id: query.id as string,
						})
					}}
				/>
				{tour && (
					<Categories
						className='mt-2'
						chosenItems={getAddedCategories(tour)}
						list={staticCategories}
						onChange={(items: ListItem[]) => {
							editTour({
								...tour,
								...items.reduce((accumulator, value) => {
									return { ...accumulator, [value.value]: true }
								}, {}),
								id: query.id as string,
							})
						}}
						label={t('categories')}
					/>
				)}
				<span className='text-xs font-medium'>
					{getAddedCategories(tour)
						.map(category => t(category.name))
						.join(', ')}
				</span>
				<div className='flex justify-between mt-5'>
					<Input
						defaultValue={tour?.duration}
						label='Длительность, ч *'
						placeholder='4'
						className='basis-[calc(50%_-_8px)]'
						onChange={event => {
							editTour({
								...tour,
								duration: event.currentTarget.value,
								id: query.id as string,
							})
						}}
					/>
					<Input
						defaultValue={tour?.placesCount}
						label='Кол-во мест'
						placeholder='17'
						className='basis-[calc(50%_-_8px)]'
						onChange={event => {
							editTour({
								...tour,
								placesCount: Number(event.currentTarget.value),
								id: query.id as string,
							})
						}}
					/>
				</div>
				{tour && (
					<>
						<MultiSelect
							chosenItems={getAddedLanguages(tour?.languages)}
							className='mt-2'
							list={langList}
							onChange={(items: ListItem[]) => {
								editTour({
									...tour,
									languages: items.map(items => items.name).join('|'),
									id: query.id as string,
								})
							}}
							label={t('chooseLanguages')}
						/>
						<span className='capitalize text-xs font-medium'>
							{tour?.languages
								?.split('|')
								.map(text => t(text))
								.join(', ')}
						</span>
					</>
				)}
			</div>
		</>
	)
}
