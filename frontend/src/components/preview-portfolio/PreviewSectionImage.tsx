import { SectionImage } from '@/interfaces';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { useTheme } from 'next-themes';

type Props = {
	section: SectionImage;
};


const PreviewSectionImage: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();
	return (
		<div className='w-full'>
		<div
			className={`flex ${
				((section as SectionImage).item.position === 'center')
					? 'justify-center'
					: ((section as SectionImage).item.position === 'right')
					? 'justify-end'
						: ''
				}`}
			>
            <div className="flex flex-col items-between m-2 w-1/2"key={section.item.id} >
                <img
                    src={(section as SectionImage).item.url}
                    alt={(section as SectionImage).item.alt}
                />
                <div style={{ fontSize: section.item.captionSize }} 
				className={`w-full outline-none 
				${theme === 'modern' ? modern.imageInputBackground : ''}
				`}>
                    {section.item.caption}
                </div>
            </div>
        </div>
		</div>
	);
};

export default PreviewSectionImage;
