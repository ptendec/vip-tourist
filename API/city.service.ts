import { $host } from 'API'
import { QueryParams } from '../utilities/interfaces'
import { components } from './types/api.types'

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
		await $host.get(`/cities/${id}/`)
	).data
}

export const searchCity = async ({
	locale,
	name,
}: QueryParams & { name: string }): Promise<
	components['schemas']['City'][]
> => {
	return await (
		await $host.get(`/cities/?_locale=${locale}&name_contains=${name}`)
	).data
}
