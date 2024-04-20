'use client';

import { IPortfolio } from '@/interfaces';
import clsx from 'clsx';

type Props = {
	portfolio: IPortfolio;
};

export const PreviewFooter: React.FC<Props> = ({ portfolio }) => {
	const theme = portfolio.theme;
	return (
		<div
			className={clsx('mx-5 py-10 text-center', {
				'text-white': theme === 'dark',
			})}
		>
			<div className="w-full">
				<div
					className={clsx('w-full mb-2 text-base font-normal', {
						'text-slate-700': theme === 'light',
						'text-blue-400': (theme === 'dark') || (theme === 'modern'),
					})}
				>
					{portfolio.footer.links}
				</div>
			</div>
			<div className="w-full outline-none ">
				<div
					className={clsx('w-full text-xs',{
						'text-slate-600': theme === 'light',
						'text-gray-400': (theme === 'dark') || (theme === 'modern'),
					})}
				>
					{portfolio.footer.text}
				</div>
			</div>
		</div>
	);
};
