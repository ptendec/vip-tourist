import axios from 'axios'

const URL = 'http://37.140.241.144:1337/'
const NotificationsURL = 'https://notification.viptourist.club/'
const otherAPIURL = 'https://viptourist.bitman.pro'

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
