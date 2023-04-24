import { ReactNode } from 'react'

export interface Categories {
	id: number
	value: string
}

export interface Breadcrumb {
	id: number
	name?: string
	href?: string
}

export interface QueryParams {
	locale?: string
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
	name?: string
}

export interface Navbar {
	id: number
	href: string
	label: string
	icon: string
}

export interface ProfileFields {
	fullName: string
	email: string
	phone: string
	socialLink: string
}

export interface Languages {
	id: number
	name: string
	value: string
	symbol: string
}

export interface Category {
	id: number
	name: string
	value: string
}

export interface DescribeFields {
	name: string
	description: string
	duration: string
	seats: number
}

export interface AdditionalFields {
	prerequisites?: string
	included?: string
	not_included?: string
	prohibitions?: string
	note?: string
}

export interface PricingFields {
	adultPrice: number
	childPrice: number
}

export interface Step {
	id: number
	element: ReactNode
}
