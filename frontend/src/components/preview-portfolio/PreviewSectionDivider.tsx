import { SectionDivider } from '@/interfaces';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionDivider;
	theme: string;
};

const PreviewSectionDivider: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className="flex items-between m-4" >
			<div
				style={{ fontSize: section.item.titleSize }} 
				className={
					clsx(
						"w-full outline-none border-b",
						theme === 'modern' && modern.dividerInputBackground,
						theme !== 'light' && 'text-white' 
					)
				}>
				{section.item.title}</div>
		</div>
	);
};

export default PreviewSectionDivider;
