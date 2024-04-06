import { PreviewFooter } from '@/components/preview-portfolio/PreviewFooter';
import { PreviewHeader } from '@/components/preview-portfolio/PreviewHeader';
import PreviewSectionsList from '@/components/preview-portfolio/PreviewSectionList';
import { IPortfolio } from '@/interfaces';
import { getPortfolioByTinyUrlId } from '@/portfolios/actions/portfolio.action';
import { FC } from 'react';

type Props = {
	params: { tinyUrl: string };
	searchParams: {};
};

const PORTFOLIO_DATA: IPortfolio = {
	id: '',
	header: {
		title: '',
		subHeading: '',
	},
	status: '',
	sections: [],
	footer: {
		links: '',
		text: '',
	},
	template: '',
	theme: '',
	tinyUrlId: '',
};

const PortfolioPreviewPage: FC<Props> = async ({ params: { tinyUrl } }) => {
	const data = await getPortfolioByTinyUrlId(tinyUrl);

	return (
		<main className=" text-2xl font-bold">
			<>
				<PreviewHeader portfolio={data} />

				{data && data.sections.length === 0 && (
					<section className="mx-[80px] max-sm:px-[30px] mt-10 flex flex-col items-center gap-3">
						<section className="bg-orange-500 rounded text-white w-fit p-5">
							No section created yet !
						</section>
					</section>
				)}

				{data && data.sections.length > 0 && (
					<PreviewSectionsList theme={data.theme} sections={data.sections} portfolioId={tinyUrl} />
				)}
				<PreviewFooter portfolio={data} />
			</>
		</main>
	);
};

export default PortfolioPreviewPage;
