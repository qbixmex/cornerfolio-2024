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

type Props = {
	params: { tinyUrl: string };
	searchParams: {};
};

const getBackgroundColor = (theme: Theme): string => {
	switch (theme) {
		case 'light':
			return 'bg-white';

		case 'dark':
			return 'bg-black';

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

	if (!token && data.status === 'draft' && data.user.id !== tokenDecoded?.id) {
		return notFound();
	}

	return (
		<main className={`${getBackgroundColor(data.theme)} text-2xl font-bold min-h-screen`}>
			<>
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
			</>
		</main>
	);
};

export default PortfolioPreviewPage;
