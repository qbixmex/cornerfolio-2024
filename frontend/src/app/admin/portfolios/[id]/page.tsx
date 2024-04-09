'use client';

import ChooseSection from '@/components/sections/chooseSection';
import SectionsList from '@/components/sections/sectionsList';
import ThemeSwitcher from '@/components/themeSwitcher';
import { IPortfolio } from '@/interfaces';
import {
	getPortfolio,
  publishPortfolio,
  unPublishPortfolio,
} from '@/portfolios/actions/portfolio.action';
import { TemplateFooter, TemplateHeader } from '@/portfolios/components';
import { useAppSelector } from '@/store';
import styles from '@/users/components/profile.module.css';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type Props = {
	params: { id: string };
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

const EditPortfolioPage: React.FC<Props> = ({ params: { id } }) => {
	const [loading, setLoading] = useState(true);
	const [portfolio, setPortfolio] = useState<IPortfolio>(PORTFOLIO_DATA);
	const reloading = useAppSelector((state) => state.reloading.reloading);
	const { setTheme } = useTheme();
	const [status, setStatus] = useState<'draft' | 'published'>('draft');

	const [toast, setToast] = useState({
		message: '',
		type: '',
	});

	useEffect(() => {
		const fetchPortfolio = async () => {
			try {
				const fetchData = await getPortfolio(id);
				console.log(fetchData);
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
	}, [id, reloading, status]);

	const handlePublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const data = await publishPortfolio(id);
			console.log(data);

			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
				setStatus('published');
			}
			setTimeout(() => setToast({ message: '', type: '' }), 4000);
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

	const handleUnPublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const data = await unPublishPortfolio(id);

			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
				setStatus('draft');
			}
			setTimeout(() => setToast({ message: '', type: '' }), 4000);
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

	return (
		<main className="ml-[52px] mt-[55px] text-2xl font-bold">
			{!loading && (
				<>
					{toast.message && (
						<div
							className={`absolute z-[1000] top-5 right-5 w-fit bg-${
								toast.type === 'error' ? 'red' : 'green'
							}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}
						>
							{toast.message}
						</div>
					)}

					<div className="fixed top-[55px] w-full bg-gray-200 flex justify-end ">
						{portfolio.status === 'draft' && (
							<form onSubmit={handlePublishPortfolio}>
								<button
									type="submit"
									className="rounded-md bg-sky-600 hover:bg-sky-500 border m-2 px-4 py-2 justify-between text-white text-base transition-colors hover:cursor-pointer"
								>
									Publish
								</button>
							</form>
						)}

						{portfolio.status === 'published' && (
							<form onSubmit={handleUnPublishPortfolio}>
								<button
									type="submit"
									className="rounded-md bg-sky-600 hover:bg-sky-500 border m-2 px-4 py-2 justify-between text-white text-base transition-colors hover:cursor-pointer"
								>
									Un-publish
								</button>
							</form>
						)}

						<Link
							href={`http://localhost:3000/${portfolio.tinyUrlId}`}
							target="blank"
							className="rounded-md bg-blue-600 hover:bg-blue-500 border m-2 mr-20 px-4 py-2 justify-between text-white text-base transition-colors"
							title="Live Portfolio Preview"
						>
							Preview
						</Link>
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