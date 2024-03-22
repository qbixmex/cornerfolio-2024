'use client';

import { FC, useEffect, useState } from 'react';
import { getPortfolio } from '@/portfolios/actions/portfolio.action';
import { TemplateHeader, TemplateFooter} from '@/portfolios/components';
import SectionsList from '@/components/sections/sectionsList';
import ChooseSection from '@/components/sections/chooseSection';
import { useAppSelector } from '@/store';
import { IPortfolio } from '@/interfaces';
import ThemeSwitcher from '@/components/themeSwitcher';
import { useTheme } from 'next-themes';
import modern from '../templates/modern-template.module.css';

type Props = {
  params: { id: string };
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

const EditPortfolioPage: FC<Props> = ({ params: { id } }) => {
  const [ loading, setLoading ] = useState(true);
  const [ portfolio, setPortfolio ] = useState<IPortfolio>(PORTFOLIO_DATA);
  const reloading = useAppSelector(state => state.reloading.reloading); 
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const fetchData = await getPortfolio(id);
        setPortfolio(fetchData);
        setLoading(false);
        setTheme(fetchData.theme);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    if (id) {
      fetchPortfolio();
    }
  }, [ id, reloading ]);
  
  
  return (
    <main className="ml-[52px] mt-[55px] text-2xl font-bold">
      {!loading &&(
        <>
          <div className='fixed top-[55px] w-full bg-gray-200 flex justify-end z-10'>
            <button className='btn rounded-md bg-gray-300 border m-2 mr-20 '>
              <a 
              href={`http://localhost:3000/${portfolio.tinyUrlId}`}
              target='blank'
              className="justify-between text-black text-base"
              >Preview</a>
            </button> 
          </div>
          <TemplateHeader portfolio={portfolio} />
          <ChooseSection portfolioId={id} order={0} />
          <ThemeSwitcher id={portfolio.id} />

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

          <TemplateFooter portfolio={portfolio} />
        </>
      )}
    </main>
  );
};

export default EditPortfolioPage;
