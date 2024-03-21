import { SectionDivider } from '@/interfaces';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { useTheme } from 'next-themes';

type Props = {
	section: SectionDivider;
};

const PreviewSectionDivider: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();
	return (
		<div className="flex items-between m-4" >
            <div style={{ fontSize: section.item.titleSize }} 
			className={`w-full outline-none border-b 
			${theme === 'modern' ? modern.dividerInputBackground : ''} 
		`}>
				{section.item.title}</div>
		</div>
	);
};

export default PreviewSectionDivider;
