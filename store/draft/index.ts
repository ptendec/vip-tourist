import { components } from '@/API/types/api.types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Draft = components['schemas']['NewTour'] & { id: string }
interface Fields {
	tours: Draft[]
}
interface Actions {
	addTour: (tour: Draft) => void
	editTour: (id: string, tour: Draft[]) => void
	removeTour: (id: string) => void
}

export const useDraftStore = create<Fields & Actions>()(
	devtools(
		persist(
			set => ({
				tours: [],
				addTour: tour =>
					set(state => ({
						tours: [...state.tours, tour],
					})),
				editTour: (id, payload) =>
					set(state => ({
						tours: state.tours.map(tour =>
							tour.id === id ? { ...tour, ...payload } : tour,
						),
					})),
				removeTour: id =>
					set(state => ({
						tours: state.tours.filter(tour => tour?.id === id),
					})),
			}),
			{
				name: 'draft',
			},
		),
	),
)
