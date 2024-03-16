"use client";

import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import updatePortfolioTheme from "../api/setTheme.fetch";

type PropsTheme = {
	id: string;
};

export default function ThemeSwitcher(props: PropsTheme) {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const handleThemeChange = async (newTheme: string) => {
		setTheme(newTheme);
		await updatePortfolioTheme({ id: props.id, theme: newTheme });
	};

	return (
		<div className="flex pb-5  ml-10">
			<h4 className="pr-4">Select your Theme</h4>
			<div className="flex gap-4">
				<Button size="sm" variant="flat" onClick={() => handleThemeChange("light")}>
					Light
				</Button>

				<Button size="sm" variant="flat" onClick={() => handleThemeChange("dark")}>
					Dark
				</Button>

				<Button
					size="sm"
					color="secondary"
					variant="bordered"
					onClick={() => handleThemeChange("modern")}
				>
					Modern
				</Button>
			</div>
		</div>
	);
}
