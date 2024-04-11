'use client';

import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import updatePortfolioTheme from '../api/setTheme.fetch';
import { Theme, useTheme } from '../context/portfolio-theme-context';

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
		<div className={`flex pb-5 ml-10 ${theme !== "light" ? "text-white" : ''}  `}>
			<h4 className={`pr-4 pb-1  `}>Select your Theme</h4>
			<div className="flex gap-4 ">
				<Button size="sm" variant="flat" onClick={() => handleThemeChange('light')}>
					Light
				</Button>

				<Button size="sm" variant="flat" onClick={() => handleThemeChange('dark')}>
					Dark
				</Button>

				<Button
					size="sm"
					color="default"
					variant="shadow"
					onClick={() => handleThemeChange('modern')}
				>
					Modern
				</Button>
			</div>
		</div>
	);
}
