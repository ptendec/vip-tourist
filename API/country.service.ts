import { $host } from 'API'
import { QueryParams } from '../utilities/interfaces'
import { components } from './types/api.types'

export const getCountries = async ({
	locale,
}: QueryParams): Promise<components['schemas']['Country'][]> => {
	return await (
		await $host.get(`/countries?_locale=${locale}`)
	).data
}

export const getCountry = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['Country']> => {
	return await (
		await $host.get(`/countries/${id}/?_locale=${locale}`)
	).data
}
