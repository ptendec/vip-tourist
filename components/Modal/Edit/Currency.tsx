import { Modal } from '@/components/UI/Modal'
import { currencyList } from '@/utilities/static'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { usePreferencesStore } from 'store/preferences'

interface Props {
	isVisible: boolean
	onClose: () => void
}

export const Currency = ({ isVisible, onClose }: Props) => {
	const { currency, editPreferences } = usePreferencesStore()
	const { t } = useTranslation()
	const { push, asPath } = useRouter()

	return (
		<Modal className='max-w-lg p-6' isVisible={isVisible} onClose={onClose}>
			<div className={clsx('rounded-lg z-10 w-full outline-none bottom-12')}>
				{currencyList
					.map(item => ({
						id: item.id,
						value: t(item.value),
						name: t(item.name ?? '-') ?? '-',
					}))
					.map((item, index) => (
						<p
							key={item.id}
							className={clsx(
								'py-2.5 px-3 flex flex-row bg-white hover:bg-[#F6F6F5] cursor-pointer transition-all duration-300 ease-out',
								currencyList.length - 1 === index && 'rounded-b-lg',
								index === 0 && 'rounded-t-lg',
							)}
							onClick={() => {
								editPreferences({
									...(currencyList.find(element => element.id === item.id) ??
										currencyList[0]),
								})
								onClose()
							}}
						>
							{item.name}
						</p>
					))}
			</div>
		</Modal>
	)
}
