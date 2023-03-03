/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./modules/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			green: '#86A545',
			gray: '#BFBFBF',
			lightWhite: '#F3F4F1',
			yellow: '#FFCE1F',
			lightGray: '#E9EAE8',
			lightDark: '#3B3F32',
			dark: '#181E0C',
			light: '#F8F8F8',
			red: '#D84343',
		},
		screens: {
			'2xl': {
				max: '1536px',
			},
			xl: {
				max: '1200px',
			},
			lg: {
				max: '1024px',
			},
			md: {
				max: '768px',
			},
			sm: {
				max: '576px',
			},
			xs: {
				max: '480px',
			},
		},
		extend: {},
	},
	plugins: [],
}
