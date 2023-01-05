import Router from 'next/router'
import axios from 'axios'
import store from 'store'

const URL = 'http://37.140.241.144:1337'

const $host = axios.create({
	baseURL: URL,
	// withCredentials: true,
})

const $authHost = axios.create({
	baseURL: URL,
	withCredentials: true,
})

const authInterceptor = async (config: any) => {
	config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
}
$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status == 401 &&
			error.config &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await $host.post('api/auth/token/refresh/', {
					withCredentials: true,
				})
				localStorage.setItem('accessToken', response.data.access)
				return $authHost.request(originalRequest)
			} catch (e) {
				// store.dispatch(removeUser())
				Router.push('/')
			}
		} else {
			throw error
		}
	},
)

export { $authHost, $host }
