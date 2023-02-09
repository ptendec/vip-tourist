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
	uid,
}: QueryParams & { uid: string }): Promise<
	components['schemas']['Profile']
> => {
	return await (
		await $host.get(`/profiles/${uid}/?_locale=${locale}`)
	).data
}
