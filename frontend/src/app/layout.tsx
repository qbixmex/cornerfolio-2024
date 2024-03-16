import { Providers } from "@/store";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { FC } from "react";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cornerfolio",
	description:
		"This is a portfolio app website for Cornerstone International Community College of Canada.",
};

type Props = {
	children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body className={montserrat.className}>
					<Providers>
						<main>{children}</main>
					</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
