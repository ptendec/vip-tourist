import axios from 'axios'

const URL = 'https://server.viptourist.club'
const NotificationsURL = 'https://notification.viptourist.club/'
const otherAPIURL = 'https://viptourist.bitman.trade'

const $host = axios.create({
	baseURL: URL,
})

const $notificationsHost = axios.create({
	baseURL: NotificationsURL,
})

const $otherAPIHost = axios.create({
	baseURL: otherAPIURL,
})

export { $notificationsHost, $host, $otherAPIHost }
