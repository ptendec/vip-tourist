import { $host } from 'API'
import { QueryParams } from '../utilities/interfaces'
import { components } from './types/api.types'

export const getOrders = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['Order'][]> => {
	return await (
		await $host.get(`/order?_locale=${locale}&profile.uid=${id}`)
	).data
}

export const getOrder = async ({
	locale,
	id,
}: QueryParams): Promise<components['schemas']['Order']> => {
	return await (
		await $host.get(`/order/${id}/?_locale=${locale}`)
	).data
}

export const getMyOrders = async ({
	id,
}: QueryParams): Promise<components['schemas']['Order'][]> => {
	return await (
		await $host.get(`/orders/?profile.uid=${id}`)
	).data
}

export const getSoldOrders = async ({
	id,
	status,
}: QueryParams & {
	status?: 'approved' | 'consideration' | 'cancelled'
}): Promise<components['schemas']['Order'][]> => {
	let url = ''
	if (status === 'approved') {
		url = '_seller_confirmed=true'
	} else if (status === 'cancelled') {
		url = '_canceled=true&_seller_confirmed=false'
	} else if (status === 'consideration') {
		url = '_seller_confirmed=false&_canceled=false'
	}
	return await (
		await $host.get(`/orders/?seller.uid=${id}&${url}`)
	).data
}

export const editOrder = async ({
	locale,
	request,
	id,
}: QueryParams & { request: components['schemas']['NewOrder'] }): Promise<
	components['schemas']['Order']
> => {
	return await (
		await $host.put(`/orders/${id}`, request)
	).data
}
