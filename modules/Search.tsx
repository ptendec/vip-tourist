import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { useState } from 'react'

export const Search = () => {
	const { t } = useTranslation()
	const { push } = useRouter()
	const [search, setSearch] = useState('')

	return (
		<div className='w-full '>
			<span className='relative h-40 w-full inline-block xs:w-[calc(100%_+_32px)] xs:-ml-4'>
				<Image fill src='/images/demo.png' alt={''} />
				<Input
					type='search'
					defaultValue={search}
					onChange={event => setSearch(event.currentTarget.value)}
					className='bottom-5 absolute w-full px-4 hidden xs:block'
					icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
					placeholder={`${t('lookCityTourNew')}`}
				/>
			</span>
			<div className='mt-8 flex flex-row gap-3 relative xs:hidden'>
				<Input
					type='search'
					defaultValue={search}
					onChange={event => setSearch(event.currentTarget.value)}
					className='basis-full'
					icon={<Icon path={mdiMagnify} size={1} color='#BFBFBF' />}
					placeholder={`${t('lookCityTourNew')}`}
					onKeyUp={event => {
						if (search === '') {
							return
						}
						if (event.code === 'Enter') {
							push(`/search/${search}`)
						}
					}}
				/>
				<Button
					onClick={() => {
						if (search === '') {
							return
						}

						push(`/search/${search}`)
					}}
					className='basis-40'
				>
					{t('search')}
				</Button>
			</div>
		</div>
	)
}
