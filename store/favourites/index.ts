import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Favourites {
	favourites: string[]
	addFavourite: (id: string) => void
	removeFavourite: (id: string) => void
}

export const useFavouritesStore = create<Favourites>()(
	devtools(
		persist(
			set => ({
				favourites: [],
				addFavourite: id =>
					set(state => ({ favourites: [...state.favourites, id] })),
				removeFavourite: id =>
					set(state => ({
						favourites: state.favourites.filter(favorite => favorite !== id),
					})),
			}),
			{
				name: 'favourites',
			},
		),
	),
)
