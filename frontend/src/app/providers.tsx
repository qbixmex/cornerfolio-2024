"use client";
import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ProvidersTheme({ children }: { children: React.ReactNode }) {

	return (
		<NextUIProvider>
			<NextThemesProvider
				attribute="class"
				defaultTheme="dark"
				themes={["dark", "light", "modern"]}
			>
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
}
