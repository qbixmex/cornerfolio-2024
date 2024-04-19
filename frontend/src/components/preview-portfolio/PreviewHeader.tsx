'use client';

import { IPortfolio } from '@/interfaces';
import clsx from 'clsx';

type Props = {
	portfolio: IPortfolio;
};

export const PreviewHeader: React.FC<Props> = ({ portfolio }) => {
	const theme = portfolio.theme;

	return (
		<div
			className={clsx('mx-5 mb-10', {
				'text-white': theme === 'dark',
			})}
		>
			<div className="w-full outline-none text-5xl">
				<div
					className={clsx('w-full pt-10 mb-3', {
						'text-slate-700': theme === 'light',
						'text-white': theme === 'dark',
						'text-lime-400': theme === 'modern',
					})}
				>
					{portfolio.header.title}
				</div>
			</div>
			<div className="w-full">
				<div
					className={clsx('w-full font-normal', {
						'text-slate-600': theme === 'light',
						'text-white': theme === 'dark',
						'text-lime-300': theme === 'modern',
					})}
				>
					{portfolio.header.subHeading}
				</div>
			</div>
		</div>
	);
};
