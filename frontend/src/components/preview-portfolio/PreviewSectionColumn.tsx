import { SectionColumn } from '@/interfaces';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionColumn;
	theme: string;
};

const PreviewSectionColumn: React.FC<Props> = ({ section, theme }) => {

	return (
		<div className="flex w-full max-sm:flex-col">
			{/* text1 */}
			<div>
				{/* heading1 */}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.headingSize1 }}
						className={clsx(`w-full outline-none ${theme === 'modern' ? modern.headerFieldInput : ''} ${theme !== 'light' ? "text-white" : ''}`)}
					>
						{section.item.heading1}
					</div>
				</div>

				{/* content 1*/}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.contentSize1 }}
						className={clsx(`w-full outline-none ${theme === 'modern' ? modern.textInputBackground : ''} ${theme !== 'light' ? "text-white" : ''}`)}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>

		{/* text2 */}
		<div>
				{/* heading2 */}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.headingSize1 }}
						className={clsx(`w-full outline-none ${theme === 'modern' ? modern.headerFieldInput : ''} ${theme !== 'light' ? "text-white" : ''}`)}
					>
						{section.item.heading1}
					</div>
				</div>

				{/* content 2*/}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.contentSize1 }}
						className={clsx( `w-full outline-none ${theme === 'modern' ? modern.textInputBackground : ''} ${theme !== 'light' ? "text-white" : ''}`)}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>

			{/* text3 */}
			<div>
				{/* heading3 */}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.headingSize1 }}
						className={clsx(`w-full outline-none ${theme === 'modern' ? modern.headerFieldInput : ''} ${theme !== 'light' ? "text-white" : ''}`)}
					>
						{section.item.heading1}
					</div>
				</div>

				{/* content 3*/}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.contentSize1 }}
						className={clsx(`w-full outline-none ${theme === 'modern' ? modern.textInputBackground : ''} ${theme !== 'light' ? "text-white" : ''}`)}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionColumn;

