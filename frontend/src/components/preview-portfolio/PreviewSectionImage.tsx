import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { SectionImage } from '@/interfaces';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionImage;
	theme: string;
};

const PreviewSectionImage: React.FC<Props> = ({ section, theme }) => {
	return (
		<div
			className={clsx("flex", {
				"justify-start": (section as SectionImage).item.position === 'left',
				"justify-center": (section as SectionImage).item.position === 'center',
				"justify-end": (section as SectionImage).item.position === 'right',
			})}>
			<div key={section.item.id} className="w-full h-auto md:w-[560px] lg:w-[80%] flex flex-col items-between">
				<img
					src={(section as SectionImage).item.url}
					alt={(section as SectionImage).item.alt}
					className={styles.sectionImage}
				/>
				<div
					style={{ fontSize: section.item.captionSize }}
					className={clsx(styles.sectionImageCaption, {
						'text-state-500': theme === 'light',
						'text-gray-400': (theme === 'dark') || (theme === 'modern'),
					})}
				>
					{section.item.caption}
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionImage;
