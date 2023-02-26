import { components } from '@/API/types/api.types'
import { DehydratedState } from '@tanstack/react-query'
import { Navbar, User } from './interfaces'
import { guideTopNavbar, noAuthTopNavbar, touristTopNavbar } from './static'

export const getURLParamsFromObject = () => {
	null
}

export const json = (data: DehydratedState) => JSON.parse(JSON.stringify(data))

export const getNavbarList = (
	user: User | null,
	profile?: components['schemas']['Profile'],
): Navbar[] => {
	if (user && profile?.is_tourist) {
		return touristTopNavbar
	} else if (user && !profile?.is_tourist) {
		return guideTopNavbar
	} else {
		return noAuthTopNavbar
	}
}

export const getCategoriesList = (categories: string[]) => {
	return categories.join('=true&')
}

export const generateUUID = () => {
	// Public Domain/MIT
	let d = new Date().getTime() //Timestamp
	let d2 =
		(typeof performance !== 'undefined' &&
			performance.now &&
			performance.now() * 1000) ||
		0 //Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = Math.random() * 16 //random number between 0 and 16
		if (d > 0) {
			//Use timestamp until depleted
			r = (d + r) % 16 | 0
			d = Math.floor(d / 16)
		} else {
			//Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0
			d2 = Math.floor(d2 / 16)
		}
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
	})
}

export const isTourExists = (
	id: string,
	tours: components['schemas']['Tour'][],
) => {
	return tours.find(tour => tour?.id === id)
}
