'use client';

import { FC, useEffect, useState } from 'react';
import { getPortfolioByTinyUrlId } from '@/portfolios/actions/portfolio.action';
import { useAppSelector } from '@/store';
import { IPortfolio } from '@/interfaces';
import { PreviewHeader } from '@/components/preview-portfolio/PreviewHeader';
import { PreviewFooter } from '@/components/preview-portfolio/PreviewFooter';
import PreviewSectionsList from '@/components/preview-portfolio/PreviewSectionList';
import { useTheme } from 'next-themes';

type Props = {
  params: { tinyUrl: string };
  searchParams: {};
};

const PORTFOLIO_DATA: IPortfolio = {
  id: '',
  header: {
    title: '',
    subHeading: ''
  },
  status: '',
  sections: [],
  footer: {
    links: '',
    text: ''
  },
  template: '',
  theme: '',
  tinyUrlId: '',
};

const PortfolioPreviewPage: FC<Props> = ({ params: { tinyUrl } }) => {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<IPortfolio>(PORTFOLIO_DATA);
  const reloading = useAppSelector(state => state.reloading.reloading);
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const fetchData = await getPortfolioByTinyUrlId(tinyUrl);
        setPortfolio(fetchData)
        setLoading(false)

        setTheme(fetchData.theme);
        console.log("fetchData", fetchData.theme)
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    if (tinyUrl) {
      fetchPortfolio();
    }
  }, [tinyUrl, reloading]);

  return (
    <main className=" text-2xl font-bold">
      {!loading && (
        <>
          <PreviewHeader portfolio={portfolio} />

          {portfolio && portfolio.sections.length === 0 && (
            <section className="mx-[80px] mt-10 flex flex-col items-center gap-3">
              <section className="bg-orange-500 rounded text-white w-fit p-5">
                No section created yet !
              </section>
            </section>
          )}

          {portfolio && portfolio.sections.length > 0 && (
            <PreviewSectionsList sections={portfolio.sections} portfolioId={tinyUrl} />
          )}
          <PreviewFooter portfolio={portfolio} />
        </>
      )}
    </main>
  );
};

export default PortfolioPreviewPage;