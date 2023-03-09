import { components } from '@/API/types/api.types'
import { DehydratedState } from '@tanstack/react-query'
import { Draft } from 'store/draft'
import { Categories, Navbar, User } from './interfaces'
import {
	guideTopNavbar,
	langList,
	noAuthTopNavbar,
	staticCategories,
	touristTopNavbar,
} from './static'

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

export const getCategoriesList = (categories: Categories[]) => {
	if (categories.length === 0) return ''
	return categories
		.map((category, index) => {
			if (index === categories.length - 1) {
				return category.value + '=true'
			}
			return category.value
		})
		.join('=true&')
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

export const isTourExists = (id: string, tours: Draft[]) => {
	return tours.find(tour => tour?.id === id)
}

export const isDaysEqual = (date1: Date, date2: Date) => {
	if (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	) {
		return true
	} else {
		return false
	}
}
export const getAddedCategories = (
	categories?: components['schemas']['NewProfile'],
) => {
	if (!categories) {
		return []
	}
	return staticCategories.filter(category =>
		Object.keys(categories).find(_category => _category == category.value),
	)
}

export const getAddedLanguages = (lanugages?: string) => {
	if (!lanugages) {
		return []
	}
	return langList.filter(language =>
		lanugages.split('|').find(_language => _language == language.name),
	)
}

export const getRating = (rating: number) => {
	const colors: string[] = []
	for (let i = 0; i < 5; i++) {
		if (Math.round(rating) > i) {
			colors.push('#FFCE1F')
		} else {
			colors.push('#BFBFBF')
		}
	}
	return colors
}
