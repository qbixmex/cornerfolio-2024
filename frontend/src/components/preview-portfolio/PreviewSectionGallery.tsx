import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { SectionGallery } from '@/interfaces';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionGallery;
	theme: string;
};

const PreviewSectionGallery: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className="w-full">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
				{/* Image 1 */}
				<figure id={section.item.id} className={styles.sectionFigure}>
					<img
						className={styles.sectionGalleryImage}
						src={(section as SectionGallery).item.url1}
						alt={(section as SectionGallery).item.alt1}
					/>
					<figcaption
						style={{ fontSize: section.item.captionSize1 }}
						className={clsx(styles.sectionGalleryCaption, {
							'modern.headerFieldInput': theme === 'modern',
							'text-white': theme !== 'light'
						})}
					>
						{section.item.caption1}
					</figcaption>
				</figure>

				{/* Image 2 */}
				<figure id={section.item.id} className={styles.sectionFigure}>
					<img
						className={styles.sectionGalleryImage}
						src={(section as SectionGallery).item.url2}
						alt={(section as SectionGallery).item.alt2}
					/>
					<figcaption
						style={{ fontSize: section.item.captionSize2 }}
						className={clsx(styles.sectionGalleryCaption, {
							'modern.headerFieldInput': theme === 'modern',
							'text-white': theme !== 'light'
						})}
					>
						{section.item.caption2}
					</figcaption>
				</figure>

				{/* Image 3 */}
				<figure id={section.item.id} className={styles.sectionFigure}>
					<img
						className={styles.sectionGalleryImage}
						src={(section as SectionGallery).item.url3}
						alt={(section as SectionGallery).item.alt3}
					/>
					<figcaption
						style={{ fontSize: section.item.captionSize3 }}
						className={clsx(styles.sectionGalleryCaption, {
							'modern.headerFieldInput': theme === 'modern',
							'text-white': theme !== 'light'
						})}
					>
						{section.item.caption3}
					</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default PreviewSectionGallery;
