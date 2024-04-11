'use client';

import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { IPortfolio } from '@/interfaces';
import clsx from 'clsx';

type Props = {
	portfolio: IPortfolio;
};

export const PreviewFooter: React.FC<Props> = ({ portfolio }) => {
	const theme = portfolio.theme;
	return (
		<div
			className={clsx(
				'py-[30px] px-[80px] border-b-gray-300 border-2',
				theme === 'modern' && modern.footerBackgroundColor,
				theme !== 'light' && 'text-white',
			)}
		>
			<div className="w-full outline-none text-5xl">
				<div
					className={clsx(
						'w-full outline-none text-sm',
						theme === 'modern' && modern.subHeaderInputField,
						theme !== 'light' && 'text-white',
					)}
				>
					{portfolio.footer.links}
				</div>
			</div>
			<div className="w-full outline-none ">
				<div
					className={clsx(
						'w-full outline-none text-sm',
						theme === 'modern' && modern.headerFieldInput,
						theme !== 'light' && 'text-white',
					)}
				>
					{portfolio.footer.text}
				</div>
			</div>
		</div>
	);
};
