import { components } from './types/api.types'
import { QueryParams } from '../utilities/interfaces'
import { $host } from 'API'
import { City } from './types/City'

export const getCities = async ({
	locale,
}: QueryParams): Promise<components['schemas']['City'][]> => {
	return await (
		await $host.get(`/cities?_locale=${locale}`)
	).data
}

export const getCity = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['City']> => {
	return await (
		await $host.get(`/cities/${id}/?_locale=${locale}`)
	).data
}
