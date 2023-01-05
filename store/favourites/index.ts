import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
	favorites: string[]
}

const initialState: InitialState = {
	favorites: [],
}

const favouritesSlice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		addFavourite(state, action: PayloadAction<string>) {
			state.favorites.push(action.payload)
		},
		removeFavourite(state, action: PayloadAction<string>) {
			state.favorites = state.favorites.filter(
				favorite => favorite !== action.payload,
			)
		},
	},
})

export const { addFavourite, removeFavourite } = favouritesSlice.actions
export default favouritesSlice.reducer
