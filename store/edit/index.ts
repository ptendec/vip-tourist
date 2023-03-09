import { components } from '@/API/types/api.types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Edit = Omit<components['schemas']['NewTour'], 'name'> & {
	name?: string
}

export type Draft = Edit & { id: string }

interface Fields {
	tour?: Draft
}
interface Actions {
	addTour: (tour: Draft) => void
	editTour: (tour: Draft) => void
	removeTour: (id: string) => void
}

export const useEditTourStore = create<Fields & Actions>()(
	devtools(
		persist(
			set => ({
				tour: undefined,
				addTour: tour =>
					set(state => ({
						tour: tour,
					})),
				editTour: tour =>
					set(state => ({
						tour,
					})),
				removeTour: id =>
					set(state => ({
						tour: undefined,
					})),
			}),
			{
				name: 'edit',
			},
		),
	),
)
