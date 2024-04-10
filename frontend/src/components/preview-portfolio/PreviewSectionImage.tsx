import { SectionImage } from '@/interfaces';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionImage;
	theme: string;
};

const PreviewSectionImage: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className='w-full'>
			<div
				className={`flex ${((section as SectionImage).item.position === 'center')
						? 'justify-center'
						: ((section as SectionImage).item.position === 'right')
							? 'justify-end'
							: ''
					}`}
			>
				<div
					key={section.item.id}
					className="flex flex-col items-between m-2 w-1/2 max-sm:w-full"
				>
					<img
						src={(section as SectionImage).item.url}
						alt={(section as SectionImage).item.alt}
					/>
					<div
						style={{ fontSize: section.item.captionSize }}
						className={
							clsx(
								"w-full outline-none",
								{[modern.imageInputBackground]:(theme === 'modern')}
							)
						}>
						{section.item.caption}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewSectionImage;
