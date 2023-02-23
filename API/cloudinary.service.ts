import { $host } from 'API'

export const uploadImage = async (formData: FormData): Promise<any> => {
	return await (
		await $host.post(
			'https://api.cloudinary.com/v1_1/dlexnnoda/image/upload',
			formData,
		)
	).data
}
