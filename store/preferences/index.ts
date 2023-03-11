import { Languages } from '@/utilities/interfaces'
import { currencyList } from '@/utilities/static'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Preferences {
	currency: Languages
	lastAlert?: Date
	editPreferences: (currency: Preferences['currency']) => void
	setAlert: () => void
}

export const usePreferencesStore = create<Preferences>()(
	devtools(
		persist(
			set => ({
				lastAlert: undefined,
				currency: currencyList[0],
				setAlert: () =>
					set(() => ({
						lastAlert: new Date(),
					})),
				editPreferences: (currency: Preferences['currency']) =>
					set(() => ({ currency: currency })),
			}),
			{
				name: 'preferences',
			},
		),
	),
)
