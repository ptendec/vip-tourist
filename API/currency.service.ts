import axios from 'axios'
import { Currency } from './types/currency.types'

export const getCurrency = async (currency: string): Promise<Currency> => {
	return await (
		await axios.get(
			`https://viptourist.bitman.pro/course?base=USD&quote=${currency}`,
		)
	).data
}
