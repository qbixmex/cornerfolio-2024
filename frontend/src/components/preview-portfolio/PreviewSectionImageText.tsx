import { SectionImageText } from '@/interfaces';
import clsx from 'clsx';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	section: SectionImageText;
	theme: string;
};

const PreviewSectionImageText: React.FC<Props> = ({ section, theme }) => {
	return (
		<div
			className={clsx('flex justify-evenly max-sm:flex-col items-center', {
				'flex-row-reverse max-sm:flex-col-reverse':
					(section as SectionImageText).item.position === 'text_img',
			})}
		>
			{/* image */}
			<div
				key={`img-${section.item.id}`}
				className="w-1/2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center"
			>
				<img
					src={(section as SectionImageText).item.imgUrl}
					alt={(section as SectionImageText).item.imgAlt}
				/>
				{/* imgCaption */}
				<div
					className={clsx(
						'flex items-between m-4',
						theme === 'modern' && modern.imageInputBackground,
						theme !== 'light' && 'text-white',
					)}
				>
					<div style={{ fontSize: section.item.imgCaptionSize }} className="w-full outline-none">
						{section.item.imgCaption}
					</div>
				</div>
			</div>
			{/* text */}
			<div
				key={`text-${section.item.id}`}
				className="w-1/2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center"
			>
				{/* txtHeading */}
				<div className="flex items-between m-4">
					<div
						style={{ fontSize: section.item.txtHeadingSize }}
						className={clsx(
							'w-full outline-none',
							theme === 'modern' && modern.headerFieldInput,
							theme !== 'light' && 'text-white',
						)}
					>
						{section.item.txtHeading}
					</div>
				</div>

				{/* txtContent */}
				<div className="flex items-between m-4">
					<div
						style={{ fontSize: section.item.txtContentSize }}
						className={clsx(
							'w-full outline-none',
							theme === 'modern' && modern.textInputBackground,
							theme !== 'light' && 'text-white',
						)}
						dangerouslySetInnerHTML={{ __html: section.item.txtContent.replace(/\n/g, '<br />') }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionImageText;
