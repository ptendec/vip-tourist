import { uploadImage } from '@/API/cloudinary.service'
import { UploadImage } from '@/components/Icons/Upload'
import { Button } from '@/components/UI/Button'
import { isTourExists } from '@/utilities/utilities'
import { mdiDelete, mdiLoading, mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDraftStore } from 'store/draft'

export const ImageStep = () => {
	const { t } = useTranslation()
	const { query } = useRouter()
	const { addTour, tours, editTour } = useDraftStore()
	const { mutateAsync: upload } = useMutation(uploadImage)
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
		upload(formData)
			.then(response => {
				editTour(query.id as string, {
					id: query.id as string,
					mainPhotoUrl: response.secure_url,
				})
			})
			.catch(error => {
				toast.error(t('errorOccuredTryAgain'))
				console.log(error)
			})
			.finally(() => {
				setUploadingPreview(false)
			})
	}

	const uploadTransfer = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		setUploadingTransfer(true)
		const image = event.currentTarget.files[0]
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'sgdiyf4c')
		upload(formData)
			.then(response => {
				editTour(query.id as string, {
					id: query.id as string,
					transferPhotoUrl: response.secure_url,
				})
			})
			.catch(error => {
				toast.error(t('errorOccuredTryAgain'))
				console.log(error)
			})
			.finally(() => {
				setUploadingTransfer(false)
			})
	}

	const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.currentTarget.files) return
		if (event.currentTarget.files.length > 10) return toast.error(t('Limit'))
		const images = event.currentTarget.files
		const uploaded: string[] = []
		const promises = []
		for (let i = 0; i < event.currentTarget.files.length; i++) {
			setUploadingGallery(true)
			const formData = new FormData()
			formData.append('file', images[i])
			formData.append('upload_preset', 'sgdiyf4c')
			const promise = upload(formData)
				.then(response => {
					uploaded.push(response.secure_url)
				})
				.catch(error => {
					toast.error(t('errorOccuredTryAgain'))
					console.log(error)
				})
				.finally(() => {
					// setUploadingGallery(false)
				})
			promises.push(promise)
		}
		Promise.all(promises).then(() => {
			setUploadingGallery(false)
			editTour(query.id as string, {
				id: query.id as string,
				image_urls: uploaded.join('|'),
			})
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
						<div className='mx-auto my-10'>
							<UploadImage />
						</div>
					) : (
						<div className='w-full'>
							<div className='flex flex-col gap-x-3 mb-4  overflow-x-auto'>
								{existingTour.mainPhotoUrl && (
									<>
										<span className='inline-block mb-2 text-sm font-semibold basis-full'>
											{t('previewImage')}:
										</span>
										<span className='inline-block w-[calc(50%_-_24px)] h-[120px] relative group'>
											<span className='absolute h-full bg-dark/[.4] w-full z-10 flex items-center justify-center rounded-lg  group-hover:visible group-hover:opacity-100 opacity-0 invisible'>
												<Button
													className=' bg-red rounded-lg px-2 !py-2 cursor-pointer !w-fit'
													onClick={() => {
														editTour(query.id as string, {
															id: query.id as string,
															mainPhotoUrl: undefined,
														})
													}}
												>
													<Icon
														className='text-white'
														path={mdiDelete}
														size={1}
													/>
												</Button>
											</span>
											<Image
												fill
												className='rounded-lg'
												src={existingTour.mainPhotoUrl}
												alt=''
											/>
										</span>
									</>
								)}
							</div>
							<div className='flex flex-col gap-x-3 mb-4'>
								{existingTour.transferPhotoUrl && (
									<>
										<span className='inline-block mb-2 text-sm font-semibold basis-full'>
											{t('Фотографие автомобиля')}:
										</span>
										<span className='inline-block w-[calc(50%_-_24px)] h-[120px] relative group'>
											<span className='absolute h-full bg-dark/[.4] w-full z-10 flex items-center justify-center rounded-lg  group-hover:visible group-hover:opacity-100 opacity-0 invisible'>
												<Button
													className=' bg-red rounded-lg px-2 !py-2 cursor-pointer !w-fit'
													onClick={() => {
														editTour(query.id as string, {
															id: query.id as string,
															transferPhotoUrl: undefined,
														})
													}}
												>
													<Icon
														className='text-white'
														path={mdiDelete}
														size={1}
													/>
												</Button>
											</span>
											<Image
												fill
												className='rounded-lg'
												src={existingTour.transferPhotoUrl}
												alt=''
											/>
										</span>
									</>
								)}
							</div>
							<div className='flex flex-col gap-x-3 mb-4'>
								{existingTour.image_urls && (
									<span className='inline-block mb-2 text-sm font-semibold basis-full'>
										{t('mainPhotos')}:
									</span>
								)}
								<div className='flex flex-row gap-4 flex-wrap w-full'>
									{existingTour.image_urls &&
										existingTour.image_urls.split('|').map((image, index) => (
											<span
												key={image}
												className='inline-block w-[calc(50%_-_24px)] h-[120px] relative scrollbar group'
											>
												<span className='absolute h-full bg-dark/[.4] w-full z-10 flex items-center justify-center rounded-lg  group-hover:visible group-hover:opacity-100 opacity-0 invisible'>
													<Button
														className='bg-red rounded-lg px-2 !py-2 cursor-pointer !w-fit'
														onClick={() => {
															editTour(query.id as string, {
																id: query.id as string,
																image_urls: existingTour.image_urls
																	?.split('|')
																	.filter((_image: string) => _image !== image)
																	.join('|'),
															})
														}}
													>
														<Icon
															className='text-white'
															path={mdiDelete}
															size={1}
														/>
													</Button>
												</span>
												<Image fill className='rounded-lg' src={image} alt='' />
											</span>
										))}
								</div>
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
					<p>{t('mainPhotos')}</p>
					<label className='flex items-center justify-center cursor-pointer rounded-full w-6 h-6 hover:scale-[1.1] shrink-0 text-white font-semibold py-3 text-sm outline-none transition-all duration-300 ease-out active:scale-[0.99] bg-green relative'>
						<input
							type='file'
							className='absolute z-10 w-full h-full hidden'
							onChange={uploadImages}
							disabled={uploadingGallery}
							multiple
						/>
						{uploadingGallery ? (
							<Icon path={mdiLoading} size={0.8} className='animate-spin' />
						) : (
							<Icon color='#fff' path={mdiPlus} size={0.8} />
						)}
					</label>
				</div>
				<div className='flex justify-between mt-4'>
					<p>{t('transfer')}</p>
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
