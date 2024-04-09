'use client';

import { FC, useEffect, useState } from 'react';
import { getPortfolioByTinyUrlId } from '@/portfolios/actions/portfolio.action';
import { useAppSelector } from '@/store';
import { IPortfolio } from '@/interfaces';
import { PreviewHeader } from '@/components/preview-portfolio/PreviewHeader';
import { PreviewFooter } from '@/components/preview-portfolio/PreviewFooter';
import PreviewSectionsList from '@/components/preview-portfolio/PreviewSectionList';
import { useTheme } from 'next-themes';
import NotFoundPage from '../not-found';

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
  const [portfolio, setPortfolio] = useState<IPortfolio|null>(PORTFOLIO_DATA);
  const reloading = useAppSelector(state => state.reloading.reloading);
  const { setTheme } = useTheme();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true)
        const fetchData = await getPortfolioByTinyUrlId(tinyUrl);
        if (fetchData.error) { 
          throw new Error(fetchData.error); 
        }
        setPortfolio(fetchData)
        setTheme(fetchData.theme);
        console.log("fetchData", fetchData.theme)
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setPortfolio(null); 
      }finally{
        setLoading(false)
      }
    };
    if (tinyUrl) {
      fetchPortfolio();
    }
  }, [tinyUrl, reloading]);

  return (
    <main className=" text-2xl font-bold">
      {!loading && portfolio? (
        <>
        
          <PreviewHeader portfolio={portfolio} />

          {portfolio && portfolio.sections.length === 0 && (
            <section className="mx-[80px] max-sm:px-[30px] mt-10 flex flex-col items-center gap-3">
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
      ):(
        <>
        <NotFoundPage/>
        </>
      )}
    </main>
  );
};

export default PortfolioPreviewPage;
