'use client';

import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import updatePortfolioTheme from '../api/setTheme.fetch';
import { Theme, useTheme } from '../context/portfolio-theme-context';
import clsx from 'clsx';

type PropsTheme = {
	id: string;
};

export default function ThemeSwitcher({ id }: PropsTheme) {
	const [mounted, setMounted] = useState(false);
	const { theme, updateTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const handleThemeChange = async (newTheme: Theme) => {
		updateTheme(newTheme);
		await updatePortfolioTheme({ id, theme: newTheme });
	};

	return (
		<div className="flex pb-5 ml-10 my-5">
			<h4 className={clsx("pr-4 pb-1 text-gray-700", {"text-white": theme !== "light"})}>
				Select your Theme
			</h4>

			<div className="flex gap-4">
				<Button
					size="sm"
					variant="flat"
					onClick={() => handleThemeChange('light')}
					className={clsx("font-semibold text-gray-600", {
						"text-white": theme !== "light",
						"bg-blue-500 text-white": theme === "light",
					})}
				>Light</Button>

				<Button
					size="sm"
					variant="flat"
					onClick={() => handleThemeChange('dark')}
					className={clsx("font-semibold text-gray-600", {
						"text-white": theme !== "light",
						"bg-blue-500 text-white": theme === "dark",
					})}
				>Dark</Button>

				<Button	
					size="sm"
					color="default"
					variant="flat"
					onClick={() => handleThemeChange('modern')}
					className={clsx("font-semibold text-gray-600", {
						"text-white": theme !== "light",
						"bg-blue-500 text-white": theme === "modern",
					})}
				>Modern</Button>
			</div>
		</div>
	);
}
