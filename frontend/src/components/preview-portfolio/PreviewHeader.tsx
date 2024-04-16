'use client';

import { IPortfolio } from '@/interfaces';
import clsx from 'clsx';
import { useEffect } from 'react';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolio: IPortfolio;
};

export const PreviewHeader: React.FC<Props> = ({ portfolio }) => {
	const theme = portfolio.theme;

	useEffect(() => {
		console.log('useTheme in Header', theme);
	}, [theme]);

	return (
		<div
			className={clsx('py-[30px] px-[80px] max-sm:px-[30px] text-black', {
				[modern.headerBackGroundColor]: theme === 'modern',
				'text-white': theme !== 'light',
			})}
		>
			<div className="w-full outline-none text-5xl">
				<div
					className={clsx('w-full outline-none text-5xl', {
						[modern.headerFieldInput]: theme === 'modern',
						'text-black': theme === 'light',
					})}
				>
					{portfolio.header.title}
				</div>
			</div>
			<div className="w-full outline-none ">
				<div
					className={clsx('w-full outline-none text-white', {
						[modern.subHeaderInputField]: theme === 'modern',
						'text-black': theme === 'light',
					})}
				>
					{portfolio.header.subHeading}
				</div>
			</div>
		</div>
	);
};
