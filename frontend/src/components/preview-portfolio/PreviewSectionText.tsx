import { SectionText } from '@/interfaces';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useTheme } from 'next-themes';

type Props = {
	section: SectionText;
};

const PreviewSectionText: React.FC<Props> = ({ section }) => {
    const { theme } = useTheme();
	return (
        <div className='w-full'>
        <div
			className={`flex w-full
                ${ ((section as SectionText).item.position === 'center')
                    ? 'justify-center'
                    : ((section as SectionText).item.position === 'right')
                    ? 'justify-end'
                    : ''
                }
			`}>
            <div key={section.item.id} className="w-3/4">
                {/* heading */}
                <div className="flex items-between m-2">
                    <div style={{ fontSize: section.item.headingSize }} 
                    className={`w-full outline-none
                    ${theme === 'modern' ? modern.headerFieldInput : ''} 
                    `}>
                        {section.item.heading}
                    </div>
                </div>

                {/* content */}
                <div className="flex items-between m-2">
                    <div 
                    style={{ fontSize: section.item.contentSize }} 
                    className={`w-full outline-none
                    ${theme === 'modern' ? modern.textInputBackground : ''}
                    `}
                    // use this?
                    dangerouslySetInnerHTML={{ __html: section.item.content.replace(/\n/g, '<br>') }}
                    >
                        {/* {section.item.content} */}
                    </div>
                </div>
            </div>
        </div>
        </div>
	);
};

export default PreviewSectionText
