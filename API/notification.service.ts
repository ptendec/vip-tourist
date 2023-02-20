import { QueryParams } from '@/utilities/interfaces'
import { $notificationsHost } from 'API'
import { components } from './types/notification.types'

export const getNotifications = async ({
	locale,
	uid,
}: QueryParams & { uid: string }): Promise<
	components['schemas']['Notification']
> => {
	return await (
		await $notificationsHost.get(
			`/notifications/?profile.uid=${uid}&_locale=${locale}`,
		)
	).data
}
