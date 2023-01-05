// Tours

export interface Localization {
	_id: string
	id: string
	locale: string
}

export interface Id {
	type: string
	data: number[]
}

export interface Localization2 {
	_id: string
	id: Id
}

export interface Thumbnail {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	path?: any
	url: string
}

export interface Large {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	path?: any
	url: string
}

export interface Medium {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	path?: any
	url: string
}

export interface Small {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	path?: any
	url: string
}

export interface Formats {
	thumbnail: Thumbnail
	large: Large
	medium: Medium
	small: Small
}

export interface Image {
	_id: string
	name: string
	alternativeText: string
	caption: string
	hash: string
	ext: string
	mime: string
	size: number
	width: number
	height: number
	url: string
	formats: Formats
	provider: string
	related: string[]
	createdAt: Date
	updatedAt: Date
	__v: number
	id: string
}

export interface City {
	next: boolean
	createdLanguage: string
	active: boolean
	popular: boolean
	notCity: boolean
	localizations: Localization2[]
	_id: string
	vid: string
	name: string
	locale: string
	createdAt: Date
	updatedAt: Date
	__v: number
	country: string
	image: Image
	id: string
}

export interface DocumentsUrls {
	urls: string[]
}

export interface Profile {
	is_tourist: boolean
	is_verified: boolean
	get_promo: boolean
	balance: number
	pushSub: boolean
	hasWhatsapp: boolean
	hasViber: boolean
	hasTelegram: boolean
	documents: any[]
	_id: string
	locale: string
	fcm_token: string
	uid: string
	photo_url: string
	phone_number: string
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
	__v: number
	socialLink: string
	documents_urls: DocumentsUrls
	id: string
}

export interface Tour {
	top: boolean
	guide: boolean
	private: boolean
	one_day_trip: boolean
	nature: boolean
	ticket_must_have: boolean
	on_water: boolean
	package_tour: boolean
	small_group: boolean
	invalid_friendly: boolean
	history: boolean
	world_war: boolean
	open_air: boolean
	street_art: boolean
	adrenaline: boolean
	architecture: boolean
	food: boolean
	music: boolean
	for_couples_activities: boolean
	for_kids_activities: boolean
	museum: boolean
	memorial: boolean
	park: boolean
	gallery: boolean
	square: boolean
	theater: boolean
	castle: boolean
	towers: boolean
	airports: boolean
	bicycle: boolean
	minivan: boolean
	public_transport: boolean
	limousine: boolean
	bicycle_taxi: boolean
	car: boolean
	cruise: boolean
	reviews_count: number
	price: number
	approved: boolean
	translationApproved: boolean
	createdLanguage: string
	alwaysAvailable: boolean
	withTransfer: boolean
	hunting: boolean
	adventure: boolean
	fishing: boolean
	night: boolean
	game: boolean
	onlyTransfer: boolean
	fewDaysTrip: boolean
	active: boolean
	image: any[]
	localizations: Localization[]
	_id: string
	locale: string
	freeTicketNotice: string
	weekDays: string
	startTime: string
	transferPhotoUrl: string
	mainPhotoUrl: string
	placesCount: number
	note: string
	date: Date
	not_included: string
	included: string
	prohibitions: string
	prerequisites: string
	child_price: number
	languages: string
	duration: string
	description: string
	image_urls: string
	name: string
	vid: string
	createdAt: Date
	updatedAt: Date
	__v: number
	city: City
	profile: Profile
	remark?: any
	reviews: any[]
	orders: any[]
	id: string
}
