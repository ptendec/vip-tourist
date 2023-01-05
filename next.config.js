/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/api:path*',
				destination: 'http://37.140.241.144:1337/api:path*',
			},
		]
	},
	images: {
		domains: [
			'http://37.140.241.144/',
			'https://37.140.241.144/',
			'37.140.241.144',
			'res.cloudinary.com',
		],
	},
	i18n,
}

module.exports = nextConfig
