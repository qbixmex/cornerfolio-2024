import { SectionDivider } from '@/interfaces';
import clsx from 'clsx';

type Props = {
	section: SectionDivider;
	theme: string;
};

const PreviewSectionDivider: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className="flex items-between m-4">
			<div
				style={{ fontSize: section.item.titleSize }} 
				className={clsx( "w-full", {
					"text-stone-700": theme === 'light',
					"text-gray-100": theme === 'dark',
					"text-lime-500": theme === 'modern',
				})}
			>{section.item.title}</div>
		</div>
	);
};

export default PreviewSectionDivider;
