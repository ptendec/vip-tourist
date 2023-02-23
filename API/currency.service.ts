import { $host } from '.'

export const getCurrency = async (currency: string): Promise<number> => {
	return await (
		await $host.get(
			`https://api.coingate.com/v2/rates/merchant/USD/${currency}`,
		)
	).data
}
