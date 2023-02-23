import { $host } from 'API'
import { QueryParams } from './../utilities/interfaces'
import { components } from './types/api.types'

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

export const getFavourites = async ({
	locale,
	tours,
}: {
	locale: string
	tours: string[]
}): Promise<components['schemas']['Tour'][]> => {
	if (tours.length === 0) {
		return []
	}
	const requestParam = tours.join('&id_in=')
	return await (
		await $host.get(`/tours?_locale=${locale}&id_in=${requestParam}`)
	).data
}

export const searchTour = async ({
	locale,
	name,
}: QueryParams & { name: string }): Promise<
	components['schemas']['Tour'][]
> => {
	return await (
		await $host.get(`/tours/?_locale=${locale}&name_contains=${name}`)
	).data
}

export const getMyTours = async ({
	id,
}: QueryParams): Promise<components['schemas']['Tour'][]> => {
	return await (
		await $host.get(`/tours/?profile.uid=${id}`)
	).data
}
