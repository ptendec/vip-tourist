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
