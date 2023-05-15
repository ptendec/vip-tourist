import {
  mdiAccount,
  mdiAccountKey,
  mdiAccountPlus,
  mdiBell,
  mdiBook,
  mdiCityVariant,
  mdiHeart,
  mdiHome,
  mdiTicketAccount,
} from '@mdi/js'
import { Category, Languages, ListItem, Navbar } from 'utilities/interfaces'
import { Breadcrumb } from './interfaces'

export const staticCategories: Category[] = [
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
  {
    id: 12,
    value: 'adventure',
    name: 'adventure',
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

export const touristTopNavbar: Navbar[] = [
  {
    id: 1,
    href: '/',
    label: 'home',
    icon: mdiHome,
  },
  {
    id: 2,
    href: '/cities',
    label: 'cities',
    icon: mdiCityVariant,
  },
  {
    id: 3,
    href: '/favourites',
    label: 'wishlist',
    icon: mdiHeart,
  },
  {
    id: 4,
    href: '/orders',
    label: 'booking',
    icon: mdiBook,
  },
  {
    id: 5,
    href: '/notifications',
    label: 'notifications',
    icon: mdiBell,
  },
  {
    id: 6,
    href: '/profile',
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
    href: '/cities',
    label: 'cities',
    icon: mdiCityVariant,
  },
  {
    id: 3,
    href: '/profile',
    label: 'profile',
    icon: mdiAccount,
  },
  {
    id: 4,
    href: '/notifications',
    label: 'notifications',
    icon: mdiBell,
  },
  {
    id: 5,
    href: '/favourites',
    label: 'wishlist',
    icon: mdiHeart,
  },
  {
    id: 6,
    href: '/guide/account',
    label: 'myTours',
    icon: mdiAccount,
  },
  {
    id: 7,
    href: '/guide/account',
    label: 'booking',
    icon: mdiTicketAccount,
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
    href: '/cities',
    label: 'cities',
    icon: mdiCityVariant,
  },
  {
    id: 3,
    href: '/favourites',
    label: 'wishlist',
    icon: mdiHeart,
  },
  {
    id: 4,
    href: '/auth/registration',
    label: 'signUp',
    icon: mdiAccountPlus,
  },
  {
    id: 5,
    href: '/auth/authorization',
    label: 'logIn',
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
    href: '/favourites',
  },
]

export const currencyList: Languages[] = [
  {
    id: 1,
    value: 'USD',
    name: 'USD',
    symbol: '$',
  },
  {
    id: 2,
    value: 'EUR',
    name: 'EUR',
    symbol: '€',
  },
  {
    id: 3,
    value: 'AED',
    name: 'AED',
    symbol: 'د.إ',
  },
  {
    id: 4,
    value: 'THB',
    name: 'THB',
    symbol: '฿',
  },
  {
    id: 5,
    value: 'TRY',
    name: 'TRY',
    symbol: '₺',
  },
  {
    id: 6,
    value: 'GBP',
    name: 'GBP',
    symbol: '£',
  },
]

export const langList: ListItem[] = [
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

export const sortList: ListItem[] = [
  {
    id: 1,
    name: 'rating',
    value: 'rating:ASC',
  },
  {
    id: 2,
    name: 'name',
    value: 'name:ASC',
  },
  {
    id: 4,
    name: 'priceAsc',
    value: 'adult_price:ASC',
  },
  {
    id: 5,
    name: 'priceDesc',
    value: 'adult_price:DESC',
  },
]
