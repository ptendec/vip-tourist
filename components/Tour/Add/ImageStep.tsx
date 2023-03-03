import { uploadImage } from '@/API/cloudinary.service'
import { UploadImage } from '@/components/Icons/Upload'
import { isTourExists } from '@/utilities/utilities'
import { mdiLoading, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDraftStore } from 'store/draft'

export const ImageStep = () => {
	const { t } = useTranslation()
	const { locale, pathname, query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore(state => state)
	const { mutate: upload, isLoading: uploading } = useMutation(uploadImage)
	const [uploadingPreview, setUploadingPreview] = useState(false)
	const [uploadingTransfer, setUploadingTransfer] = useState(false)
	const [uploadingGallery, setUploadingGallery] = useState(false)

	const existingTour = isTourExists(query.id as string, tours)

	useEffect(() => {
		if (!existingTour) {
			addTour({
				id: query.id as string,
				name: '',
			})
		}
	}, [query.id])

	const uploadPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		setUploadingPreview(true)
		const image = event.currentTarget.files[0]
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'sgdiyf4c')
		upload(formData, {
			onSuccess: response => {
				editTour(query.id as string, {
					id: query.id as string,
					mainPhotoUrl: response.secure_url,
				})
				setUploadingPreview(false)
			},
			onError: error => {
				toast.error('Не удалось загрузить, попробуйте позднее')
				console.log(error)
			},
		})
	}
	const uploadTransfer = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		setUploadingTransfer(true)
		const image = event.currentTarget.files[0]
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'sgdiyf4c')
		upload(formData, {
			onSuccess: response => {
				editTour(query.id as string, {
					id: query.id as string,
					transferPhotoUrl: response.secure_url,
				})
				setUploadingTransfer(false)
			},
			onError: error => {
				toast.error('Не удалось загрузить, попробуйте позднее')
				console.log(error)
			},
		})
	}
	const uploadImages = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		setUploadingGallery(true)
		const image = event.currentTarget.files[0]
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'sgdiyf4c')
		upload(formData, {
			onSuccess: response => {
				editTour(query.id as string, {
					id: query.id as string,
					image_urls: !existingTour?.image_urls
						? `${response.secure_url}`
						: existingTour?.image_urls + `|${response.secure_url}`,
				})
				setUploadingGallery(false)
			},
			onError: error => {
				toast.error('Не удалось загрузить, попробуйте позднее')
				console.log(error)
			},
		})
	}

	return (
		<>
			<h2 className='font-semibold text-center block mb-5'>{t('photos')}</h2>
			<div>
				<div className='w-full flex items-center'>
					{!existingTour?.mainPhotoUrl &&
					!existingTour?.transferPhotoUrl &&
					!existingTour?.image_urls ? (
						<div className='mx-auto'>
							<UploadImage />
						</div>
					) : (
						<div className='flex flex-col overflow-x-auto'>
							<div className='flex flex-row gap-x-3 flex-wrap mb-4  overflow-x-auto'>
								{existingTour.mainPhotoUrl && (
									<>
										<span className='inline-block mb-2 text-sm font-semibold basis-full'>
											{t('previewImage')}:
										</span>
										<img
											className='rounded-lg'
											src={existingTour.mainPhotoUrl}
											width='100px'
											height='100px'
											alt=''
										/>
									</>
								)}
							</div>
							<div className='flex flex-row gap-x-3 flex-wrap mb-4 overflow-x-auto'>
								{existingTour.transferPhotoUrl && (
									<>
										<span className='inline-block mb-2 text-sm font-semibold basis-full'>
											{t('Фотографие автомобиля')}:
										</span>
										<img
											className='rounded-lg'
											src={existingTour.transferPhotoUrl}
											width='100px'
											height='100px'
											alt=''
										/>
									</>
								)}
							</div>
							<div className='flex flex-row gap-x-3 flex-wrap mb-4 overflow-x-auto'>
								{existingTour.image_urls && (
									<span className='inline-block mb-2 text-sm font-semibold basis-full'>
										{t('Фотогалерея')}:
									</span>
								)}
								{existingTour.image_urls &&
									existingTour.image_urls
										.split('|')
										.map((image, index) => (
											<img
												className='rounded-lg'
												key={index}
												src={image}
												width='100px'
												height='100px'
												alt=''
											/>
										))}
							</div>
						</div>
					)}
				</div>
				<div className='flex justify-between mt-4'>
					<p>{t('previewImage')}</p>
					<label className='flex items-center justify-center cursor-pointer rounded-full w-6 h-6 hover:scale-[1.1] shrink-0 text-white font-semibold py-3 text-sm outline-none transition-all duration-300 ease-out active:scale-[0.99] bg-green relative'>
						<input
							type='file'
							className='absolute z-10 w-full h-full hidden'
							onChange={uploadPreview}
							disabled={uploadingPreview}
						/>
						{uploadingPreview ? (
							<Icon path={mdiLoading} size={0.8} className='animate-spin' />
						) : (
							<Icon color='#fff' path={mdiPlus} size={0.8} />
						)}
					</label>
				</div>
				<div className='flex justify-between mt-4'>
					<p>{t('Фотогалерея')}</p>
					<label className='flex items-center justify-center cursor-pointer rounded-full w-6 h-6 hover:scale-[1.1] shrink-0 text-white font-semibold py-3 text-sm outline-none transition-all duration-300 ease-out active:scale-[0.99] bg-green relative'>
						<input
							type='file'
							className='absolute z-10 w-full h-full hidden'
							onChange={uploadImages}
							disabled={uploadingGallery}
						/>
						{uploadingGallery ? (
							<Icon path={mdiLoading} size={0.8} className='animate-spin' />
						) : (
							<Icon color='#fff' path={mdiPlus} size={0.8} />
						)}
					</label>
				</div>
				<div className='flex justify-between mt-4'>
					<p>{t('Фотография автомобиля')}</p>
					<label className='flex items-center justify-center cursor-pointer rounded-full w-6 h-6 hover:scale-[1.1] shrink-0 text-white font-semibold py-3 text-sm outline-none transition-all duration-300 ease-out active:scale-[0.99] bg-green relative'>
						<input
							type='file'
							className='absolute z-10 w-full h-full hidden'
							onChange={uploadTransfer}
							disabled={uploadingTransfer}
						/>
						{uploadingTransfer ? (
							<Icon path={mdiLoading} size={0.8} className='animate-spin' />
						) : (
							<Icon color='#fff' path={mdiPlus} size={0.8} />
						)}
					</label>
				</div>
			</div>
		</>
	)
}
