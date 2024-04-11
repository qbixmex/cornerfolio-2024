"use client"

import { Theme } from "@/context/portfolio-theme-context";

export const getBackgroundColor = (theme: Theme): string => {
	switch (theme) {
		case 'light':
			return 'bg-white';

		case 'dark':
			return 'bg-black';

		case 'modern':
			return `bg-[#13141A]`;

		default:
			throw new Error('invalid theme');
	}
};