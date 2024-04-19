import { SectionColumn } from '@/interfaces';
import clsx from 'clsx';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';

type Props = {
	section: SectionColumn;
	theme: string;
};

const PreviewSectionColumn: React.FC<Props> = ({ section, theme }) => {

	return (
		<div className={styles.sectionColumnContainer}>
			{/* Text 1 */}
			<section>
				{/* heading 1 */}
				<div className="flex items-between m-2">
					<h3
						style={{ fontSize: section.item.headingSize1 }}
						className={clsx(
							styles.sectionColumnHeading, {
								"text-stone-700": theme !== 'light',
								"text-white": theme === 'dark',
								[modern.heading]: theme === 'modern',
							}
						)}
					>{section.item.heading1}</h3>
				</div>

				{/* content 1 */}
				<div className="flex items-between m-2">
					<p
						style={{ fontSize: section.item.contentSize1 }}
						className={clsx(
							styles.sectionColumnDescription, {
							"text-stone-700": theme !== 'light',
							"text-white": theme === 'dark',
							[modern.description]: theme === 'modern',
							}
						)}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(
							/\n/g,
							'<div style="width:100%;height:12px;">&nbsp</div>'
						)}}
					></p>
				</div>
			</section>

			{/* Text 2 */}
			<section>
				{/* heading 2 */}
				<div className="flex items-between m-2">
					<h3
						style={{ fontSize: section.item.headingSize2 }}
						className={clsx(
							styles.sectionColumnHeading, {
								"text-stone-700": theme !== 'light',
								"text-white": theme === 'dark',
								[modern.heading]: theme === 'modern',
							}
						)}
					>{section.item.heading2}</h3>
				</div>

				{/* content 2 */}
				<div className="flex items-between m-2">
					<p
						style={{ fontSize: section.item.contentSize2 }}
						className={clsx(
							styles.sectionColumnDescription, {
								"text-stone-700": theme !== 'light',
								"text-white": theme === 'dark',
								[modern.description]: theme === 'modern',
							}
						)}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(
							/\n/g,
							'<div style="width:100%;height:12px;">&nbsp</div>'
						)}}
					></p>
				</div>
			</section>

			{/* Text 3 */}
			<section>
				{/* heading 3 */}
				<div className="flex items-between m-2">
					<h3
						style={{ fontSize: section.item.headingSize3 }}
						className={clsx(
							styles.sectionColumnHeading, {
								"text-stone-700": theme !== 'light',
								"text-white": theme === 'dark',
								[modern.heading]: theme === 'modern',
							}
						)}
					>{section.item.heading3}</h3>
				</div>

				{/* content 3 */}
				<div className="flex items-between m-2">
					<p
						style={{ fontSize: section.item.contentSize3 }}
						className={clsx(
							styles.sectionColumnDescription, {
								"text-stone-700": theme !== 'light',
								"text-white": theme === 'dark',
								[modern.description]: theme === 'modern',
							}
						)}
						dangerouslySetInnerHTML={{ __html: section.item.content1.replace(
							/\n/g,
							'<div style="width:100%;height:12px;">&nbsp</div>'
						)}}
					></p>
				</div>
			</section>

		</div>
	);
};

export default PreviewSectionColumn;

