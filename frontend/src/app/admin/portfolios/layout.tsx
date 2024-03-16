import Sidebar from "@/components/sidebar";
import TopNavigation from "@/components/topNavigation";
import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

const PortfolioLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<ThemeProvider>
				<main className="my-10">{children}</main>
			</ThemeProvider>
		</>
	);
};

export default PortfolioLayout;
