export interface Categories {
	id: number
	value: string
}

export interface Breadcrumb {
	name: string
	href: string
}

export interface QueryParams {
	locale: string
	id?: string
}

export interface AdditionalInfo {
	id: string
	title: string
	description: string
}

export interface AuthorizationFields {
	email: string
	password: string
}
