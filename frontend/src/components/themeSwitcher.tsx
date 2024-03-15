"use client";

import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { UserIcon } from "./icons";

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="flex gap-4 pt-5 pl-3 ml-10">
			<Button size="sm" variant="flat" onClick={() => setTheme("light")}>
				Light
			</Button>

			<Button size="sm" variant="flat" onClick={() => setTheme("dark")}>
				Dark
			</Button>

			<Button size="sm" color="secondary" variant="bordered" onClick={() => setTheme("modern")}>
				Modern
			</Button>
		</div>
	);
}
