import { QueryParams } from '@/utilities/interfaces'
import { $host } from 'API'
import { components } from './types/api.types'

export const createProfile = async ({
	locale,
	request,
}: QueryParams & { request: components['schemas']['NewProfile'] }): Promise<
	components['schemas']['Profile']
> => {
	return await (
		await $host.post(`/profiles/?_locale=${locale}`, request)
	).data
}

export const getProfile = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['Profile']> => {
	return await (
		await $host.get(`/profiles/${id}/?_locale=${locale}`)
	).data
}

export const editProfile = async ({
	locale,
	request,
	id,
}: QueryParams & { request: components['schemas']['NewProfile'] }): Promise<
	components['schemas']['Profile']
> => {
	return await (
		await $host.put(`/profiles/${id}`, request)
	).data
}
