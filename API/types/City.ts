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
	medium: Medium
	small: Small
}

export interface Flag {
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

export interface Country {
	code: string
	createdLanguage: string
	localizations: Localization2[]
	_id: string
	name: string
	locale: string
	vid: string
	createdAt: Date
	updatedAt: Date
	__v: number
	flag: Flag
	id: string
}

export interface Thumbnail2 {
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

export interface Medium2 {
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

export interface Small2 {
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

export interface Formats2 {
	thumbnail: Thumbnail2
	large: Large
	medium: Medium2
	small: Small2
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
	formats: Formats2
	provider: string
	related: string[]
	createdAt: Date
	updatedAt: Date
	__v: number
	id: string
}

export interface Id2 {
	type: string
	data: number[]
}

export interface Localization3 {
	_id: string
	id: Id2
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
	localizations: Localization3[]
	_id: string
	vid: string
	image_urls: string
	duration: string
	child_price: number
	date: Date
	placesCount: number
	mainPhotoUrl: string
	transferPhotoUrl: string
	startTime: string
	weekDays: string
	name: string
	description: string
	languages: string
	prerequisites: string
	prohibitions: string
	included: string
	not_included: string
	note: string
	freeTicketNotice: string
	locale: string
	createdAt: Date
	updatedAt: Date
	__v: number
	city: string
	profile: string
	id: string
}

export interface City {
	next: boolean
	createdLanguage: string
	active: boolean
	popular: boolean
	notCity: boolean
	localizations: Localization[]
	_id: string
	name: string
	locale: string
	vid: string
	createdAt: Date
	updatedAt: Date
	__v: number
	country: Country
	image: Image
	tours: Tour[]
	id: string
}
