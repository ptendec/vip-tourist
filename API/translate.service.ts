import { $host } from '.'

export const translate = async (locale: string, text: string): Promise<any> => {
	return await (
		await $host.post('https://viptourist.bitman.pro/translate', {
			target: locale,
			text,
		})
	).data
}
