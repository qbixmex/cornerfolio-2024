'use client';

import { IPortfolio } from '@/interfaces';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';

type Props = {
	portfolio: IPortfolio
};

export const PreviewFooter: React.FC<Props> = ({ portfolio }) => {
	const theme = portfolio.theme;
	return (
		<div className={clsx(
			"py-[30px] px-[80px] border-b-gray-300 border-2",
			{ [modern.footerBackgroundColor]: (theme === 'modern') }
		)}>
			<div className="w-full outline-none text-5xl">
				<div className={clsx(
					"w-full outline-none text-sm",
					{ [modern.footerTextColor]: (theme === 'modern') }
				)}>
					{portfolio.footer.links}
				</div>
			</div>
			<div className="w-full outline-none ">
				<div className={clsx(
					"w-full outline-none text-sm",
					{ [modern.subHeaderInputField]: (theme === 'modern') }
				)}>
					{portfolio.footer.text}
				</div>
			</div>		
		</div>
	);
};
