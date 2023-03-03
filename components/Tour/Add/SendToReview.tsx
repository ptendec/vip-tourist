import { Button } from '@/components/UI/Button'
import { isTourExists } from '@/utilities/utilities'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDraftStore } from 'store/draft'

export const SendToReview = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore(state => state)
	const existingTour = isTourExists(query.id as string, tours)
	const formedImages = existingTour?.image_urls?.split('|')

	function push(arg0: string) {
		throw new Error('Function not implemented.')
	}

	return (
		<div className='flex flex-col items-center justify-center relative py-10 my-auto'>
			<div className='h-[220px] w-full flex flex-col items-center'>
				<div className='bg-[#F1F3EC] w-[220px] h-[220px] rounded-full absolute mx-auto block'></div>
				<div className='text-sm flex w-[315px] bg-white p-[10px] rounded-lg relative z-10 shadow-lg mt-10'>
					<span className='relative inline-block basis-20 h-20 shrink-0 '>
						<span className='top-2 absolute z-20 left-2 rounded-lg bg-yellow py-[3px] leading-tight inline-block px-1.5 font-bold text-[10px]'>
							$ {existingTour?.adult_price}
						</span>
						<Image
							className='rounded-lg'
							src={existingTour?.mainPhotoUrl ?? ''}
							alt='Фотография тура'
							fill
						/>
					</span>
					<div className='ml-[10px]'>
						<p className='font-semibold '>{existingTour?.name}</p>
						<span className='text-gray limit'>{existingTour?.description}</span>
					</div>
				</div>
			</div>

			<div className='relative z-20 text-center'>
				<p className='text-lg mt-10 text-center font-bold'>
					{t('tourSendTag1')}
				</p>
				<span className='text-lightDark mb-8 inline-block'>
					{t('tourSendTag2')}
				</span>
				<Button
					className='w-8/12 mx-auto'
					onClick={() => {
						push('/')
					}}
				>
					{t('goToOffers')}
				</Button>
			</div>
		</div>
	)
}
