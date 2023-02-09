export interface Categories {
	id: number
	value: string
}

export interface Breadcrumb {
	name?: string
	href?: string
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

export type ArrayElement<
	ArrayType extends readonly unknown[] | undefined | null,
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export interface User {
	uid: string
	email: string
}

export interface AuthContext {
	user: User | null
	loading: boolean
}

export interface ListItem {
	id: number
	icon?: string
	value: string
}

export interface Navbar {
	id: number
	href: string
	label: string
	icon: string
}
