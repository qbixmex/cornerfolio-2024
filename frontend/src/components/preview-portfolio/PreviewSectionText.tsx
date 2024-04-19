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
				<div key={section.item.id} className="w-3/4 max-md:w-full">
					{/* heading */}
					<div className="flex items-between m-2">
						<div
							style={{ fontSize: section.item.headingSize }}
							className={`w-full outline-none ${ theme === 'modern' ? modern.headerFieldInput : '' } ${theme !== 'light' ? 'text-white' : ''}`}
						>
							{section.item.heading}
						</div>
					</div>

					{/* content */}
					<div className="flex items-between m-2">
						<div
							style={{ fontSize: section.item.contentSize }}
							className={clsx(
								styles.sectionImageTextDescription, {
									'text-stone-600': theme === 'light',
									'text-white': theme === 'dark',
									[modern.description]: theme === 'modern',
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
