import { getCategoriesList } from '@/utilities/utilities'
import { $host } from 'API'
import { Tour } from 'store/draft'
import { Category, QueryParams } from './../utilities/interfaces'
import { components } from './types/api.types'

export const getTours = async ({
	locale,
}: QueryParams): Promise<components['schemas']['Tour'][]> => {
	return await (
		await $host.get(`/tours?_locale=${locale}`)
	).data
}

export const getToursByCity = async ({
	id,
	locale,
	categories,
}: QueryParams & { categories: Category[] }): Promise<
	components['schemas']['Tour'][]
> => {
	const list = getCategoriesList(categories)
	return await (
		await $host.get(`/tours/?city.id=${id}&_locale=${locale}&${list}`)
	).data
}

export const getToursByCityFromCatalogue = async ({
	locale,
	categories,
}: QueryParams & { categories: string }): Promise<
	components['schemas']['Tour'][]
> => {
	return await (
		await $host.get(`/tours/?_locale=${locale}&${categories}`)
	).data
}

export const getTour = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['Tour']> => {
	return await (
		await $host.get(`/tours/${id}`)
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
	url,
}: QueryParams & { url?: string }): Promise<
	components['schemas']['Tour'][]
> => {
	return await (
		await $host.get(`/tours/?profile.uid=${id}${url}`)
	).data
}

export const createTour = async (
	request: Tour,
): Promise<components['schemas']['Tour']> => {
	return await (
		await $host.post('/tours/', request)
	).data
}

export const editTour = async (
	request: Tour,
): Promise<components['schemas']['Tour']> => {
	return await (
		await $host.post('/tours/', request)
	).data
}
