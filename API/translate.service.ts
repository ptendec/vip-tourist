import { $host } from '.'

export const translate = async (locale: string, text: string): Promise<any> => {
	return await (
		await $host.post('https://viptourist.bitman.trade/translate', {
			target: locale,
			text,
		})
	).data
}
