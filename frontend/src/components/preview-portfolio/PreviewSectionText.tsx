'use client';

import { SectionText } from '@/interfaces';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionText;
	theme: string;
};

const PreviewSectionText: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className="w-full">
			<div
				className={`flex w-full ${
					(section as SectionText).item.position === 'center'
						? 'justify-center'
						: (section as SectionText).item.position === 'right'
							? 'justify-end'
							: ''
				}`}
			>
				<div key={section.item.id} className="w-full lg:w-3/4">
					{/* heading */}
					<div className="flex items-between m-2">
						<div
							style={{ fontSize: section.item.headingSize }}
							className={clsx("w-full", {
								"text-stone-700": theme === 'light',
								"text-gray-100": theme === 'dark',
								"text-sky-400": theme === 'modern',
							})
						}>{section.item.heading}</div>
					</div>

					{/* content */}
					<div className="flex items-between m-2">
						<div
							style={{ fontSize: section.item.contentSize }}
							className={clsx(
								styles.sectionImageTextDescription, {
									'text-stone-600': theme === 'light',
									'text-gray-100': theme === 'dark',
									"text-gray-50": theme === 'modern',
								}
							)}
							dangerouslySetInnerHTML={{ __html: section.item.content.replace(/\n/g, '<br />') }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionText;
