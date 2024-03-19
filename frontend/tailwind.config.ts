import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/users/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/portfolios/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {
					layout: {},
					colors: {},
				},
				dark: {
					layout: {},
					colors: {},
				},
				modern: {
					colors: {
						background: '#7289F4',
						focus: '#979500',
						text: '#FABBDF',
						input: 'red',
						textForeground: '#ED3F68',
						primary: {
							50: '#3B096C',
							100: '#520f83',
						},
					},
					layout: {
						radius: {
							small: '0.5rem',
							medium: '1rem',
							large: '1.5rem',
						},
					},
				},
			},
		}),
	],
};
export default config;
