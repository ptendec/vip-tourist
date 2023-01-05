import { QueryParams } from '../utilities/interfaces'
import { $host } from 'API'
import { City } from './types/City'

export const getCities = async ({ locale }: QueryParams): Promise<City[]> => {
	return await (
		await $host.get(`/cities?_locale=${locale}`)
	).data
}
