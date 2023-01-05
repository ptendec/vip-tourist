import { AdditionalInfo } from 'utilities/interfaces'
import { Breadcrumb } from './interfaces'
import { Categories } from 'utilities/interfaces'
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
	},
	{
		id: 2,
		value: 'Однодневный тур',
	},
	{
		id: 3,
		value: 'Водные развлечения',
	},
	{
		id: 4,
		value: 'Входной билет',
	},
	{
		id: 5,
		value: 'Только трансфер',
	},
	{
		id: 6,
		value: 'Природа',
	},
	{
		id: 7,
		value: 'Игра',
	},
	{
		id: 8,
		value: 'Рыбалка',
	},
	{
		id: 9,
		value: 'Охота',
	},
	{
		id: 10,
		value: 'Частный тур',
	},
	{
		id: 11,
		value: 'На открытом воздухе',
	},
	{
		id: 12,
		value: 'Со снегом',
	},
	{
		id: 13,
		value: 'Отдых на воде',
	},
	{
		id: 14,
		value: 'Обязательное наличие билета',
	},
	{
		id: 15,
		value: 'Пакетный тур',
	},
	{
		id: 16,
		value: 'Небольшие группы',
	},
	{
		id: 17,
		value: 'Подходит для инвалидов',
	},
	{
		id: 18,
		value: 'История',
	},
	{
		id: 19,
		value: 'Уличное исскуство',
	},
	{
		id: 20,
		value: 'Адреналин',
	},
	{
		id: 21,
		value: 'Архитектура',
	},
	{
		id: 22,
		value: 'Еда',
	},
	{
		id: 23,
		value: 'Музыка',
	},
	{
		id: 24,
		value: 'Для пар',
	},
	{
		id: 25,
		value: 'Для детей',
	},
	{
		id: 26,
		value: 'Музеи',
	},
	{
		id: 27,
		value: 'Тур на несколько дней',
	},
	{
		id: 28,
		value: 'Парки',
	},
	{
		id: 29,
		value: 'Галерея',
	},
	{
		id: 30,
		value: 'Экскурсия в воздухе',
	},
	{
		id: 31,
		value: 'Театры',
	},
	{
		id: 32,
		value: 'Башни',
	},
	{
		id: 33,
		value: 'Аэропорты',
	},
	{
		id: 34,
		value: 'Минивэн',
	},
	{
		id: 35,
		value: 'Отправить для публикаций',
	},
]

export const staticBreadcrumbs: Breadcrumb[] = [
	{
		href: '/',
		name: 'Главная',
	},
	{
		href: '/city/',
		name: 'Алматы',
	},
	{
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
