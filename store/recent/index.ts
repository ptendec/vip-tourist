import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Recent {
	recents: string[]
	addRecent: (id: string) => void
	removeRecent: (id: string) => void
}

export const useRecentStore = create<Recent>()(
	devtools(
		persist(
			set => ({
				recents: [],
				addRecent: id => set(state => ({ recents: [...state.recents, id] })),
				removeRecent: id =>
					set(state => ({
						recents: state.recents.filter(favorite => favorite !== id),
					})),
			}),
			{
				name: 'recents',
			},
		),
	),
)
