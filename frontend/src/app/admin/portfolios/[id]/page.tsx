'use client';

import { FC, useEffect, useState } from 'react';
import { getPortfolio } from '@/portfolios/actions/portfolio.action';
import { TemplateHeader, TemplateFooter } from '@/portfolios/components';
import SectionsList from '@/components/sections/sectionsList';
import ChooseSection from '@/components/sections/chooseSection';

type Props = {
  params: { id: string };
  searchParams: {};
};

const EditPortfolioPage: FC<Props> = ({ params: { id } }) => {
  // in the future, it should be in redux.
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<any>({});

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const fetchData = await getPortfolio(id);
        setPortfolio(fetchData)
        setLoading(false)
        console.log(fetchData)
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    if (id) {
      fetchPortfolio();
    }
  }, [id]);


  return (
    <main className="ml-[52px] mt-[55px] text-2xl font-bold">
      {!loading && (
        <>
          <TemplateHeader header={portfolio.header} />
          <ChooseSection portfolioId={id} order={0} />

          <hr />
          
          {portfolio && portfolio.sections.length === 0 && (
            <section className="mx-[80px] mt-10 flex flex-col items-center gap-3">
              <section className="bg-orange-500 rounded text-white w-fit p-5">
                No section created yet !
              </section>
            </section>
          )}

          {portfolio && portfolio.sections.length > 0 && (
            <SectionsList sections={portfolio.sections} portfolioId={id} />
          )}

          <TemplateFooter footer={portfolio.footer} />
        </>
      )}
    </main>
  );
};

export default EditPortfolioPage;
