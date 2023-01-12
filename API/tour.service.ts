import { components } from './types/api.types'
import { QueryParams } from './../utilities/interfaces'
import { $host } from 'API'
import { Tour } from './types/Tour'

export const getTours = async ({
	locale,
}: QueryParams): Promise<components['schemas']['Tour'][]> => {
	return await (
		await $host.get(`/tours?_locale=${locale}`)
	).data
}

export const getTour = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['Tour']> => {
	return await (
		await $host.get(`/tours/${id}?_locale=${locale}`)
	).data
}
