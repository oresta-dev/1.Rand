/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				'primary' : "#FAC800",
				'secondary': "#2C2F3D",
				'tertiary': "#E9EAED"
			}
		},
		screens: {
			'xss': '340px',
			'xs': '410px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		}
	},
	plugins: [],
}
