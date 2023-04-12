import { Button } from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { mdiMagnify, mdiMap } from '@mdi/js'
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
		<div className='w-full xs:h-40'>
			<div className='relative h-40 w-full flex items-end xs:w-[calc(100%_+_32px)] xs:-ml-4'>
				<Image
					fill
					src='/images/demo.png'
					style={{
						objectFit: 'cover',
					}}
					alt='Main page image'
				/>
				<div className='w-full relative hidden xs:flex mb-4'>
					<Input
						type='text'
						defaultValue={search}
						onChange={event => setSearch(event.currentTarget.value)}
						className='bottom-5 w-full px-4 '
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
					<button className='absolute top-2.5 right-6 border-l pl-2 text-green bg-white'>
						<Icon path={mdiMap} size={1} />
					</button>
				</div>
			</div>
			<div className='mt-8 flex flex-row gap-3 relative xs:hidden'>
				<div className='flex w-full relative'>
					<Input
						type='text'
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
					<button className='absolute top-2.5 right-3 border-l pl-2 text-green bg-white'>
						<Icon path={mdiMap} size={1} />
					</button>
				</div>
				<Button
					onClick={() => {
						if (search === '') {
							return
						}

						push(`/search/${search}`)
					}}
					className='basis-40 font-medium'
				>
					{t('search')}
				</Button>
			</div>
		</div>
	)
}
