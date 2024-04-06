import { SectionColumn } from '@/interfaces';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useTheme } from 'next-themes';

type Props = {
	section: SectionColumn;
    theme: string;
};

const PreviewSectionColumn: React.FC<Props> = ({ section, theme }) => {

	return (
        <div className="flex w-full max-sm:flex-col">
                {/* text1 */}
                <div className=''>
                    {/* heading1 */}
                    <div className="flex items-between m-2">
                        <div style={{ fontSize: section.item.headingSize1 }} 
                        className={`w-full outline-none
                        ${theme === 'modern' ? modern.headerFieldInput : ''} 
                        `}>
                            {section.item.heading1}
                        </div>
                    </div>

                    {/* content 1*/}
                    <div className="flex items-between m-2">
                        <div 
                        style={{ fontSize: section.item.contentSize1 }} 
                        className={`w-full outline-none
                        ${theme === 'modern' ? modern.textInputBackground : ''}
                        `}
                        // use this?
                        dangerouslySetInnerHTML={{ __html: section.item.content1.replace(/\n/g, '<br>') }}
                        >
                            {/* {section.item.content1} */}
                        </div>
                    </div>
                </div>

                {/* text2 */}
                <div className=''>
                    {/* heading2 */}
                    <div className="flex items-between m-2">
                        <div style={{ fontSize: section.item.headingSize2 }} 
                        className={`w-full outline-none
                        ${theme === 'modern' ? modern.headerFieldInput : ''} 
                        `}>
                            {section.item.heading2}
                        </div>
                    </div>

                    {/* content2 */}
                    <div className="flex items-between m-2">
                        <div 
                        style={{ fontSize: section.item.contentSize2 }} 
                        className={`w-full outline-none
                        ${theme === 'modern' ? modern.textInputBackground : ''}
                        `}
                        // use this?
                        dangerouslySetInnerHTML={{ __html: section.item.content2.replace(/\n/g, '<br>') }}
                        >
                            {/* {section.item.content2} */}
                        </div>
                    </div>
                </div>

                {/* text3 */}
                <div className=''>
                    {/* heading3 */}
                    <div className="flex items-between m-2">
                        <div style={{ fontSize: section.item.headingSize3 }} 
                        className={`w-full outline-none
                        ${theme === 'modern' ? modern.headerFieldInput : ''} 
                        `}>
                            {section.item.heading3}
                        </div>
                    </div>

                    {/* content3 */}
                    <div className="flex items-between m-2">
                        <div 
                        style={{ fontSize: section.item.contentSize3 }} 
                        className={`w-full outline-none
                        ${theme === 'modern' ? modern.textInputBackground : ''}
                        `}
                        // use this?
                        dangerouslySetInnerHTML={{ __html: section.item.content2.replace(/\n/g, '<br>') }}
                        >
                            {/* {section.item.content3} */}
                        </div>
                    </div>
                </div>
            
        </div>
	);
};

export default PreviewSectionColumn
