import { $otherAPIHost } from '.'
import { WeatherResponse } from './types/weather.types'

export const getWeather = async (
	city: string,
): Promise<{ data: WeatherResponse }> => {
	return await (
		await $otherAPIHost.post('/weather/', {
			city,
		})
	).data
}
