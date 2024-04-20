import { PreviewFooter } from '@/components/preview-portfolio/PreviewFooter';
import { PreviewHeader } from '@/components/preview-portfolio/PreviewHeader';
import PreviewSectionsList from '@/components/preview-portfolio/PreviewSectionList';
import { Theme } from '@/context/portfolio-theme-context';
import { Token } from '@/interfaces';
import { getPortfolioByTinyUrlId } from '@/portfolios/actions/portfolio.action';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import styles from "./tiny-url.module.css";
import { RobotVector } from '@/components/icons';
import clsx from 'clsx';

type Props = {
	params: { tinyUrl: string };
	searchParams: {};
};

const getBackgroundColor = (theme: Theme): string => {
	switch (theme) {
		case 'light':
			return 'bg-slate-200';

		case 'dark':
			return 'bg-[#222]';

		case 'modern':
			return `bg-[#13141A]`;

		default:
			throw new Error('invalid theme');
	}
};

const PortfolioPreviewPage: React.FC<Props> = async ({ params: { tinyUrl } }) => {
	const cookiesStore = cookies();
	const token = cookiesStore.get('token');
	const tokenDecoded = jwt.decode(token?.value!) as Token;

	const data = await getPortfolioByTinyUrlId(tinyUrl);
	if (data.error) {
		return notFound();
	}

	if (data.status === 'draft') {
		if (!token || (tokenDecoded && tokenDecoded.id !== data.user.id)) {
			return notFound();
		}
	}
	
	return (
		<main className={`${getBackgroundColor(data.theme)} text-2xl font-bold min-h-screen md:py-10`}>
			<div className={clsx("w-[100%] md:w-[90%] xl:w-[1280px] mx-auto px-5 md:rounded-lg", {
				"bg-gray-50": data.theme === 'light',
			})}>
				<PreviewHeader portfolio={data} />

				{data && data.sections.length === 0 && (
					<section className={styles.noSectionsContainer}>
						<section className={styles.noSectionsRobotContainer}>
							<div className={styles.noSectionsRobotCircle} />
							<RobotVector className={styles.noSectionsRobot} />
						</section>
							<div className={styles.noSectionsText}>
								No Sections Added Yet
							</div>
					</section>
				)}
				{data && data.sections.length > 0 && (
					<PreviewSectionsList
						theme={data.theme}
						sections={data.sections}
						portfolioId={tinyUrl}
					/>
				)}

				<PreviewFooter portfolio={data} />
			</div>
		</main>
	);
};

export default PortfolioPreviewPage;
