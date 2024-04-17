"use client";

import { Theme, useTheme } from "@/context/portfolio-theme-context";
import { IPortfolio } from "@/interfaces";
import ThemeSwitcher from "@/components/themeSwitcher";
import { TemplateHeader } from "./templateHeader";
import ChooseSection from "@/components/sections/chooseSection";
import SectionsList from "@/components/sections/sectionsList";
import { TemplateFooter } from "./templateFooter";
import ManageStatus from "./manageStatus";
import { useAppSelector } from "@/store";
import Toast from "@/components/toast";

type Props = {
  portfolio: IPortfolio;
};

const CustomizePortfolio: React.FC<Props> = ({ portfolio }) => {
  const toast = useAppSelector(state => state.toast);
  const { theme } = useTheme();

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
      {(toast.message) && (
        <Toast type={toast.type}>{toast.message}</Toast>
      )}

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
