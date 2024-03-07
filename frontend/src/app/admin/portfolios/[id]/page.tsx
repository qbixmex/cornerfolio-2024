import { FC } from 'react';
import { MdAdd } from 'react-icons/md';
import { getPortfolio } from '@/portfolios/actions/portfolio.action';
import { TemplateHeader, TemplateFooter } from '@/portfolios/components';

type Props = {
    params: { id: string };
    searchParams: {};
};

const EditPortfolioPage: FC<Props> = async ({ params }) => {
    const portfolio = await getPortfolio(params.id);

    return (
        <main className="ml-[52px] mt-[55px] text-2xl font-bold">
            <TemplateHeader header={portfolio.header} />
            {portfolio.sections.length === 0 && (
                <section className="mx-[80px] mt-10 flex flex-col items-center gap-3">
                    <section className="bg-orange-500 rounded text-white w-fit p-5">
                        No section created yet
                    </section>
                    <button className="bg-slate-600 p-2 rounded text-white">
                        <MdAdd size={50} />
                    </button>
                </section>
            )}
            <TemplateFooter footer={portfolio.footer} />
        </main>
    );
};

export default EditPortfolioPage;
