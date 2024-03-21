'use client';
import { IPortfolio } from '@/interfaces';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { useTheme } from 'next-themes';


type Props = {
	portfolio: IPortfolio
};

export const PreviewFooter: React.FC<Props> = ({ portfolio }) => {
	const { theme } = useTheme();
	return (
		<div className={`py-[30px] px-[80px] border-b-gray-300 border-2 
		${
			theme === 'modern' ? modern.footerBackgroundColor : ''
		}
		`}>
			<div className="w-full outline-none text-5xl">
			    <div className={`w-full outline-none text-sm
				${theme === 'modern' ? modern.footerTextColor : ''}
				`}>{portfolio.footer.links}</div>			
			</div>
			<div className="w-full outline-none ">
				<div className={`w-full outline-none  text-sm
				${theme === 'modern' ? modern.subHeaderInputField : ''}
				`}>{portfolio.footer.text}</div>
			</div>		
		</div>
		
	);
};
