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
						className={clsx("w-full outline-none", { [modern.headerFieldInput]: (theme === 'modern') })}
					>
						{section.item.heading1}
					</div>
				</div>

				{/* content 1*/}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.contentSize1 }}
						className={clsx( "w-full outline-none", { [modern.textInputBackground]: theme === 'modern' })}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>

			{/* text2 */}
			<div className=''>
				{/* heading2 */}
				<div className="flex items-between m-2">
					<div style={{ fontSize: section.item.headingSize2 }}
						className={clsx( "w-full outline-none", { [modern.headerFieldInput]: (theme === 'modern') })}>
						{section.item.heading2}
					</div>
				</div>

				{/* content2 */}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.contentSize2 }}
						className={clsx("w-full outline-none", { [modern.textInputBackground]: (theme === 'modern') })}
						dangerouslySetInnerHTML={{ __html: section.item.content2.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>

			{/* text3 */}
			<div>
				{/* heading3 */}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.headingSize3 }}
						className={clsx("w-full outline-none", {[modern.headerFieldInput]: (theme === 'modern')})}
					>
						{section.item.heading3}
					</div>
				</div>

				{/* content3 */}
				<div className="flex items-between m-2">
					<div
						style={{ fontSize: section.item.contentSize3 }}
						className={clsx("w-full outline-none", { [modern.textInputBackground]: (theme === 'modern') })}
						dangerouslySetInnerHTML={{ __html: section.item.content2.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionColumn;

