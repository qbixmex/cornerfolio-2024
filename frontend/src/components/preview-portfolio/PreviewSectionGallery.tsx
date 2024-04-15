import modern from '@/app/admin/portfolios/templates/modern-template.module.css';

import { SectionGallery } from '@/interfaces';

type Props = {
	section: SectionGallery;
	theme: string;
};

const PreviewSectionGallery: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className="w-full">
			<div className="flex items-center max-sm:flex-col w-full">
				{/* image1 */}
				<div className="flex flex-col items-between m-1 w-1/3 max-sm:w-full" key={section.item.id}>
					<img
						src={(section as SectionGallery).item.url1}
						alt={(section as SectionGallery).item.alt1}
					/>
					<div
						style={{ fontSize: section.item.captionSize1 }}
						className={`w-full outline-none ${
							theme === 'modern' ? 'modern.headerFieldInput' : ''
						} ${theme !== 'light' ? 'text-white' : ''}`}
					>
						{section.item.caption1}
					</div>
				</div>
				{/* image2 */}
				<div className="flex flex-col items-between m-1 w-1/3 max-sm:w-full" key={section.item.id}>
					<img
						src={(section as SectionGallery).item.url2}
						alt={(section as SectionGallery).item.alt2}
					/>
					<div
						style={{ fontSize: section.item.captionSize2 }}
						className={`w-full outline-none ${theme === 'modern' ? modern.imageInputBackground : ''} ${theme !== 'light' ? 'text-white' : ''}`}
					>
						{section.item.caption2}
					</div>
				</div>
				{/* image3 */}
				<div className="flex flex-col items-between m-1 w-1/3 max-sm:w-full" key={section.item.id}>
					<img
						src={(section as SectionGallery).item.url3}
						alt={(section as SectionGallery).item.alt3}
					/>
					<div
						style={{ fontSize: section.item.captionSize2 }}
						className={`w-full outline-none ${theme === 'modern' ? modern.imageInputBackground : ''} ${theme !== 'light' ? 'text-white' : ''}`}
					>
						{section.item.caption3}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionGallery;
