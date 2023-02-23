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
		value: 'Тур с гидом',
		name: 'guide',
	},
	{
		id: 2,
		value: 'Однодневный тур',
		name: 'one_day_trip',
	},
	{
		id: 3,
		value: 'Водные развлечения',
		name: 'on_water',
	},
	// {
	// id: 4,
	// value: 'Входной билет',
	// name: 'ticket_must_have',
	// },
	{
		id: 5,
		value: 'Только трансфер',
		name: 'withTransfer',
	},
	{
		id: 6,
		value: 'Природа',
		name: 'nature',
	},
	{
		id: 7,
		value: 'Игра',
		name: 'game',
	},
	{
		id: 8,
		value: 'Рыбалка',
		name: 'fishing',
	},
	{
		id: 9,
		value: 'Охота',
		name: 'hunting',
	},
	{
		id: 10,
		value: 'Частный тур',
		name: 'private',
	},
	{
		id: 11,
		value: 'На открытом воздухе',
		name: 'open_air',
	},
	// {
	// id: 12,
	// value: 'Со снегом',
	// },
	{
		id: 13,
		value: 'Отдых на воде',
		name: 'on_water',
	},
	{
		id: 14,
		value: 'Обязательное наличие билета',
		name: 'ticket_must_have',
	},
	{
		id: 15,
		value: 'Пакетный тур',
		name: 'package_tour',
	},
	{
		id: 16,
		value: 'Небольшие группы',
		name: 'small_group',
	},
	{
		id: 17,
		value: 'Подходит для инвалидов',
		name: 'invalid_friendly',
	},
	{
		id: 18,
		value: 'История',
		name: 'history',
	},
	{
		id: 19,
		value: 'Уличное исскуство',
		name: 'street_art',
	},
	{
		id: 20,
		value: 'Адреналин',
		name: 'adrenaline',
	},
	{
		id: 21,
		value: 'Архитектура',
		name: 'architecture',
	},
	{
		id: 22,
		value: 'Еда',
		name: 'food',
	},
	{
		id: 23,
		value: 'Музыка',
		name: 'msuic',
	},
	{
		id: 24,
		value: 'Для пар',
		name: 'for_couples_activities',
	},
	{
		id: 25,
		value: 'Для детей',
		name: 'for_kids_activities',
	},
	{
		id: 26,
		value: 'Музеи',
		name: 'museum',
	},
	{
		id: 27,
		value: 'Тур на несколько дней',
		name: 'package_tour',
	},
	{
		id: 28,
		value: 'Парки',
		name: 'package_tour',
	},
	{
		id: 29,
		value: 'Галерея',
		name: 'gallery',
	},
	{
		id: 30,
		value: 'Экскурсия в воздухе',
		name: 'package_tour',
	},
	{
		id: 31,
		value: 'Театры',
		name: 'theater',
	},
	{
		id: 32,
		value: 'Башни',
		name: 'castle',
	},
	{
		id: 33,
		value: 'Аэропорты',
		name: 'airports',
	},
	{
		id: 34,
		value: 'Минивэн',
		name: 'minivan',
	},
	{
		id: 35,
		value: 'Круиз',
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
		id: 1,
		name: 'russian',
		value: 'ru-ru',
	},
	{
		id: 1,
		name: 'german',
		value: 'de-de',
	},
	{
		id: 1,
		name: 'thai',
		value: 'th-th',
	},
	{
		id: 1,
		name: 'turkish',
		value: 'tr-tr',
	},
	{
		id: 1,
		name: 'french',
		value: 'fr-fr',
	},
	{
		id: 1,
		name: 'arabian',
		value: 'ar-ar',
	},
	{
		id: 1,
		name: 'spanish',
		value: 'es-es',
	},
	{
		id: 1,
		name: 'italian',
		value: 'it-it',
	},
]
