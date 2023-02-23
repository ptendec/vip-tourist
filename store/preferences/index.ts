import { Languages } from '@/utilities/interfaces'
import { currencyList } from '@/utilities/static'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Preferences {
	currency: Languages
}

interface Actions {
	editPreferences: (preferences: Preferences) => void
}

export const usePreferencesStore = create<Preferences & Actions>()(
	devtools(
		persist(
			set => ({
				currency: currencyList[0],
				editPreferences: (preferences: Preferences) =>
					set(() => ({ ...preferences })),
			}),
			{
				name: 'preferences',
			},
		),
	),
)
