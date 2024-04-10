'use client';

import NotFoundPortfolio from '@/components/not-found-portfolio';
import ChooseSection from '@/components/sections/chooseSection';
import SectionsList from '@/components/sections/sectionsList';
import ThemeSwitcher from '@/components/themeSwitcher';
import { IPortfolio } from '@/interfaces';
import {
	UnPublishPortfolio,
	getPortfolio,
	publishPortfolio,
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
	const [portfolio, setPortfolio] = useState<IPortfolio | null>(PORTFOLIO_DATA);
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
				setLoading(true);
				const fetchData = await getPortfolio(id);
				if (fetchData.error) {
					throw new Error(fetchData.error);
				}
				setPortfolio(fetchData);
				setTheme(fetchData.theme);
				console.log(fetchData);
			} catch (error) {
				console.error('Error fetching portfolio:', error);
				setPortfolio(null);
			} finally {
				setLoading(false);
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
			const data = await UnPublishPortfolio(id);

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
					{portfolio ? (
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

							<section className="fixed top-[55px] w-full bg-gray-200 flex justify-end">
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
							</section>
							<TemplateHeader portfolio={portfolio} />
							<ChooseSection portfolioId={id} order={0} />
							<ThemeSwitcher id={portfolio.id} />
							<hr />
							{portfolio && portfolio.sections.length === 0 && (
								<section className="mx-[80px] my-10 flex flex-col items-center gap-3">
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
					) : (
						<NotFoundPortfolio />
					)}
				</>
			)}
		</main>
	);
};

export default EditPortfolioPage;
