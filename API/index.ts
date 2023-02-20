import axios from 'axios'

const URL = 'https://server.viptourist.club'
const NotificationsURL = 'https://notification.viptourist.club/'

const $host = axios.create({
	baseURL: URL,
})

const $notificationsHost = axios.create({
	baseURL: NotificationsURL,
})

export { $notificationsHost, $host }
