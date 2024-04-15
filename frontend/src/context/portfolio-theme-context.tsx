'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

const themes = ['light', 'dark', 'modern'] as const;

export type Theme = (typeof themes)[number];

export type ThemeContext = {
	theme: Theme;
	updateTheme: (theme: Theme) => void;
};
const INITIAL_STATE: ThemeContext = {
	theme: 'light',
	updateTheme: () => {},
};

type Props = {
	children: ReactNode;
};

const ThemeContext = createContext<ThemeContext>(INITIAL_STATE);

export function ThemeContextProvider({ children }: Props) {
	const [theme, setTheme] = useState<Theme>('light');

	const updateTheme = (theme: Theme) => {
		setTheme(theme);
	};

	return <ThemeContext.Provider value={{ theme, updateTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
