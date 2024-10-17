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
	},
	plugins: [],
}
