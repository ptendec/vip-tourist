import { QueryParams } from './../utilities/interfaces'
import { $host } from 'API'
import { Tour } from './types/Tour'

export const getTours = async ({ locale }: QueryParams): Promise<Tour[]> => {
	return await (
		await $host.get(`/tours?_locale=${locale}`)
	).data
}
