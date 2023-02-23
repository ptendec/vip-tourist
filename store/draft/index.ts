import { Languages } from '@/utilities/interfaces'
import { currencyList } from '@/utilities/static'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Fields {
	currency: Languages
}

interface Actions {
	editPreferences: (preferences: Fields) => void
}

export const useDraftStore = create<Fields & Actions>()(
	devtools(
		persist(
			set => ({
				currency: currencyList[0],
				editPreferences: (preferences: Fields) =>
					set(() => ({ ...preferences })),
			}),
			{
				name: 'draft',
			},
		),
	),
)
