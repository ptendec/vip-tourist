import { Category } from '@/components/UI/Category'
import { Input } from '@/components/UI/Input'
import { Textarea } from '@/components/UI/Textarea'
import { ListItem } from '@/utilities/interfaces'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

export const DescribeStep = () => {
	useEffect(() => {
		return () => {
			console.log('here')
		}
	}, [])
	const { t } = useTranslation()
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
				/>
				<Textarea
					label={t('desc') as string}
					className='mb-5 h-10'
					placeholder={t('enterTourName') as string}
				/>
				<Category
					list={[
						{
							id: 1,
							value: 'Привет',
						},
					]}
					label='Категории'
					width={'w-full'}
					onChange={function (option: ListItem): void {
						null
					}}
				/>
				<div className='flex justify-between mt-5'>
					<Input
						label='Длительность, ч *'
						placeholder='4'
						className='basis-[calc(50%_-_8px)]'
					/>
					<Input
						label='Кол-во мест'
						placeholder='17'
						className='basis-[calc(50%_-_8px)]'
					/>
				</div>
				<Category
					list={[
						{
							id: 1,
							value: 'Привет',
						},
					]}
					label='Категории'
					width={'w-full'}
					onChange={function (option: ListItem): void {
						null
					}}
				/>
			</div>
		</>
	)
}
