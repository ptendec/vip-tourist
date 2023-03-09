import { ListItem } from '@/utilities/interfaces'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Fragment, useState } from 'react'
import { sortList } from 'utilities/static'
import { Button } from '../UI/Button'

interface Props {
	isVisible: boolean
	onClose: () => void
	set: (item: ListItem | undefined) => void
	selected?: string
}

export const Sort = ({ isVisible, onClose, set, selected }: Props) => {
	const { t } = useTranslation()
	const [sort, setSort] = useState(
		sortList.find(item => item?.value === selected),
	)

	return (
		<div
			className={clsx(
				'fixed overflow-y-scroll scrollbar transition-all duration-500 ease-out h-screen right-0 top-0 shadow-xl bg-white p-8 z-10 w-[400px]',
				isVisible ? '' : '-right-[400px] overflow-y-scroll',
			)}
		>
			<div className='flex flex-row justify-between mb-8'>
				<p className='text-xl font-semibold capitalize'>{t('sortBy')}</p>
				<button onClick={onClose} className=''>
					<Icon path={mdiClose} size={1} color='#3B3F32' />
				</button>
			</div>
			<div>
				{sortList.map(item => (
					<Fragment key={item.id}>
						<span
							className={clsx(
								'block py-2 px-4 cursor-pointer hover:bg-[#F6F6F5] rounded-lg transition-all duration-300 ease-out ',
								item.id === sort?.id ? 'bg-[#F6F6F5] font-semibold' : '',
							)}
							onClick={() => {
								if (item.id === sort?.id) {
									setSort(undefined)
								} else {
									setSort(item)
								}
							}}
						>
							{t(item.name ?? '')}
						</span>
					</Fragment>
				))}
			</div>
			<Button
				className='py-2 mt-3'
				onClick={() => {
					set(sort)
					onClose()
				}}
			>
				Применить
			</Button>
		</div>
	)
}
