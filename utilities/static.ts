import {
	mdiAccount,
	mdiAccountKey,
	mdiAccountPlus,
	mdiBell,
	mdiBook,
	mdiHeart,
	mdiHome,
} from '@mdi/js'
import { AdditionalInfo, Languages, Navbar } from 'utilities/interfaces'
import { Breadcrumb } from './interfaces'
export const SidebarOptions = [
	{
		id: 1,
		name: 'Главная',
		href: '/',
	},
	{
		id: 2,
		name: 'Избранные',
		href: '/favourites',
	},
	{
		id: 3,
		name: 'Заказы',
		href: '/orders',
	},
	{
		id: 4,
		name: 'Уведомления',
		href: '/notifications',
	},
	{
		id: 5,
		name: 'Профиль',
		href: '/profile',
	},
]

export const staticCategories = [
	{
		id: 1,
		value: 'guide',
		name: 'guidedTour',
	},
	{
		id: 2,
		value: 'one_day_trip',
		name: 'oneDay',
	},
	{
		id: 3,
		value: 'on_water',
		name: 'onWater',
	},
	{
		id: 4,
		value: 'ticket_must_have',
		name: 'ticketMustHave',
	},
	// {
	// 	id: 5,
	// 	value: 'Только трансфер',
	// 	name: 'withTransfer',
	// },
	{
		id: 6,
		value: 'nature',
		name: 'natuer',
	},
	{
		id: 7,
		value: 'game',
		name: 'game',
	},
	{
		id: 8,
		value: 'fishing',
		name: 'fishing',
	},
	{
		id: 9,
		value: 'hunting',
		name: 'hunting',
	},
	{
		id: 10,
		value: 'private',
		name: 'privateTourForGroup',
	},
	{
		id: 11,
		value: 'open_air',
		name: 'openAir',
	},
	// {
	// id: 12,
	// value: 'Со снегом',
	// },
	{
		id: 13,
		value: 'on_water',
		name: 'onWater',
	},
	{
		id: 15,
		value: 'package_tour',
		name: 'packageTour',
	},
	{
		id: 16,
		value: 'small_group',
		name: 'smallGroup',
	},
	{
		id: 17,
		value: 'invalid_friendly',
		name: 'invalidFriend',
	},
	{
		id: 18,
		value: 'history',
		name: 'history',
	},
	{
		id: 19,
		value: 'street_art',
		name: 'StreetArt',
	},
	{
		id: 20,
		value: 'adrenaline',
		name: 'adrenaline',
	},
	{
		id: 21,
		value: 'architecture',
		name: 'architecture',
	},
	{
		id: 22,
		value: 'food',
		name: 'food',
	},
	{
		id: 23,
		value: 'music',
		name: 'music',
	},
	{
		id: 24,
		value: 'for_couples_activities',
		name: 'forCouples',
	},
	{
		id: 25,
		value: 'for_kids_activities',
		name: 'forKids',
	},
	{
		id: 26,
		value: 'museum',
		name: 'museums',
	},
	{
		id: 27,
		value: 'fewDaysTrip',
		name: 'fewDaysTrip',
	},
	{
		id: 28,
		value: 'park',
		name: 'parks',
	},
	{
		id: 29,
		value: 'gallery',
		name: 'gallery',
	},
	// {
	// 	id: 30,
	// 	value: 'Экскурсия в воздухе',
	// 	name: 'package_tour',
	// },
	{
		id: 31,
		value: 'theater',
		name: 'theaters',
	},
	{
		id: 32,
		value: 'castle',
		name: 'castles',
	},
	{
		id: 33,
		value: 'airports',
		name: 'airpots',
	},
	{
		id: 34,
		value: 'minivan',
		name: 'minivan',
	},
	{
		id: 35,
		value: 'cruise',
		name: 'cruise',
	},
]

export const staticBreadcrumbs: Breadcrumb[] = [
	{
		id: 1,
		href: '/',
		name: 'Главная',
	},
	{
		id: 2,
		href: '/city/',
		name: 'Алматы',
	},
	{
		id: 3,
		href: '/tour/',
		name: 'Тур',
	},
]

export const additionalInfoList: AdditionalInfo[] = [
	{
		id: '1',
		title: 'Что включено',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		id: '2',
		title: 'Возьмите с собой',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
	{
		id: '3',
		title: 'Важная информация',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	},
]

const addTourSteps = [
	{
		id: 1,
		name: 'Choose city',
		t: 'addTour',
	},
	{
		id: 2,
		name: 'Describe tour',
		t: 'addTour',
	},
	{
		id: 3,
		name: 'Additional',
		t: 'additional',
	},
	{
		id: 4,
		name: 'Pricing',
		t: 'addTour',
	},
	{
		id: 5,
		name: 'Images upload',
		t: 'photos',
	},
	{
		id: 6,
		name: 'Preview',
		t: 'addTour',
	},
]

export const touristTopNavbar: Navbar[] = [
	{
		id: 1,
		href: '/',
		label: 'home',
		icon: mdiHome,
	},
	{
		id: 2,
		href: '/favourites',
		label: 'wishlist',
		icon: mdiHeart,
	},
	{
		id: 3,
		href: '/tourist/orders',
		label: 'booking',
		icon: mdiBook,
	},
	{
		id: 4,
		href: '/notifications',
		label: 'notifications',
		icon: mdiBell,
	},
	{
		id: 5,
		href: '/tourist/profile',
		label: 'profile',
		icon: mdiAccount,
	},
]

export const guideTopNavbar: Navbar[] = [
	{
		id: 1,
		href: '/',
		label: 'home',
		icon: mdiHome,
	},
	{
		id: 2,
		href: '/guide/profile',
		label: 'profile',
		icon: mdiAccount,
	},
	{
		id: 3,
		href: '/notifications',
		label: 'notifications',
		icon: mdiBell,
	},
	{
		id: 4,
		href: '/favourites',
		label: 'wishlist',
		icon: mdiHeart,
	},
]

export const noAuthTopNavbar: Navbar[] = [
	{
		id: 1,
		href: '/',
		label: 'home',
		icon: mdiHome,
	},
	{
		id: 2,
		href: '/favourites',
		label: 'wishlist',
		icon: mdiHeart,
	},
	{
		id: 3,
		href: '/auth/registration',
		label: 'signUp',
		icon: mdiAccountPlus,
	},
	{
		id: 4,
		href: '/auth/authorization',
		label: 'login',
		icon: mdiAccountKey,
	},
]

export const favouritesBreadcrumbs: Breadcrumb[] = [
	{
		id: 1,
		name: 'home',
		href: '/',
	},
	{
		id: 2,
		name: 'wishlist',
		href: '/',
	},
]

export const currencyList: Languages[] = [
	{
		id: 1,
		value: 'USD',
		name: 'American Dollar',
		symbol: '$',
	},
	{
		id: 2,
		value: 'EUR',
		name: 'Euro',
		symbol: '€',
	},
	{
		id: 3,
		value: 'AED',
		name: 'UAE Dirham',
		symbol: 'د.إ',
	},
	{
		id: 4,
		value: 'THB',
		name: 'Thai Baht',
		symbol: '฿',
	},
	{
		id: 5,
		value: 'TRY',
		name: 'Turkish Lira',
		symbol: '₺',
	},
	{
		id: 6,
		value: 'GBP',
		name: 'Great British Pound',
		symbol: '£',
	},
]

export const langList = [
	{
		id: 1,
		name: 'english',
		value: 'en',
	},
	{
		id: 2,
		name: 'russian',
		value: 'ru-RU',
	},
	{
		id: 3,
		name: 'german',
		value: 'de-DE',
	},
	{
		id: 4,
		name: 'thai',
		value: 'th-TH',
	},
	{
		id: 5,
		name: 'turkish',
		value: 'tr-TR',
	},
	{
		id: 6,
		name: 'french',
		value: 'fr-FR',
	},
	{
		id: 7,
		name: 'arabian',
		value: 'ar-AE',
	},
	{
		id: 8,
		name: 'spanish',
		value: 'es-ES',
	},
	{
		id: 9,
		name: 'italian',
		value: 'it-IT',
	},
]
