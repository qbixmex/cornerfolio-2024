import { SectionImageText } from '@/interfaces';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useTheme } from 'next-themes';

type Props = {
	section: SectionImageText;
};


const PreviewSectionImageText: React.FC<Props> = ({ section }) => {
    const { theme } = useTheme();
	return (
        <div className={`flex justify-evenly ${
            ((section as SectionImageText).item.position === 'text_img')
                ? 'flex-row-reverse'
                : ''
        }`}>
            {/* image */}
            <div className="w-1/2" key={`img-${section.item.id}`}>
			    <img
					src={(section as SectionImageText).item.imgUrl}
					alt={(section as SectionImageText).item.imgAlt}
				/>
				{/* imgCaption */}
                <div className={`flex items-between m-4
                ${theme === 'modern' ? modern.imageInputBackground : ''}
                `} >
                    <div style={{ fontSize: section.item.imgCaptionSize }} className='w-full outline-none'>
                        {section.item.imgCaption}
                    </div>
                </div>
			</div>
            {/* text */}
            <div className="w-1/2 " key={`text-${section.item.id}`}>
                {/* txtHeading */}
                <div className="flex items-between m-4">
                    <div style={{ fontSize: section.item.txtHeadingSize }} 
                    className={`w-full outline-none
                    ${theme === 'modern' ? modern.headerFieldInput : ''}
                    `}>
                        {section.item.txtHeading}
                    </div>
                </div>
                {/* txtContent */}
                <div className="flex items-between m-4">
                    <div 
                    style={{ fontSize: section.item.txtContentSize }} 
                    className={`w-full outline-none
                    ${theme === 'modern' ? modern.textInputBackground : ''}
                    `}
                    // use this?
                    dangerouslySetInnerHTML={{ __html: section.item.txtContent.replace(/\n/g, '<br>') }}
                    >
                        {/* {section.item.txtContent} */}
                    </div>
                </div>
            </div>
        </div>
	);
};

export default PreviewSectionImageText
