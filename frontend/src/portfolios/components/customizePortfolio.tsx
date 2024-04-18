"use client";

import { Theme, useTheme } from "@/context/portfolio-theme-context";
import { IPortfolio } from "@/interfaces";
import ThemeSwitcher from "@/components/themeSwitcher";
import { TemplateHeader } from "./templateHeader";
import ChooseSection from "@/components/sections/chooseSection";
import SectionsList from "@/components/sections/sectionsList";
import { TemplateFooter } from "./templateFooter";
import ManageStatus from "./manageStatus";
import { useEffect,useState } from "react";

type Props = {
  portfolio: IPortfolio;
};

const CustomizePortfolio: React.FC<Props> = ({ portfolio }) => {
  const { theme,updateTheme} = useTheme();
  const [ initialized, setInitialized ] = useState(false);

  useEffect(() => {
    if (portfolio.theme === 'light' || portfolio.theme === 'dark' || portfolio.theme === 'modern') {
      updateTheme(portfolio.theme as Theme); 
      setInitialized(true);
    } else {
      console.error('Invalid theme:', portfolio.theme); 
    }
  }, [initialized, portfolio.theme]);


  const getBackgroundColor = (theme: Theme): string => {
    switch (theme) {
      case 'light':
        return 'bg-white';

      case 'dark':
        return 'bg-black text-white';

      case 'modern':
        return `bg-[#13141A]`;

      default:
        throw new Error('invalid theme');
    }
  };

  return (
    <main className={`${getBackgroundColor(theme)} ml-[52px] mt-[55px] text-2xl font-bold`}>
      <ManageStatus
        portfolioId={portfolio.id}
        tinyUrlId={portfolio.tinyUrlId}
        status={portfolio.status}
      />

      <TemplateHeader theme={theme} portfolio={portfolio} />

      <ThemeSwitcher id={portfolio.id} />

      <ChooseSection
        portfolioId={portfolio.id}
        order={0}
        theme={theme}
      />

      <hr />

      {portfolio && portfolio.sections.length === 0 && (
        <section className="mx-[80px] my-10 flex flex-col items-center gap-3">
          <section className="bg-orange-500 rounded text-white w-fit p-5">
            No sections added yet !
          </section>
        </section>
      )}

      {portfolio && portfolio.sections.length > 0 && (
        <SectionsList
          sections={portfolio.sections}
          portfolioId={portfolio.id}
          theme={theme}
        />
      )}

      <TemplateFooter portfolio={portfolio} />
    </main>
  );
};

export default CustomizePortfolio;
