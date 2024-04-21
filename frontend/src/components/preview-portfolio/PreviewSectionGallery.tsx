import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import { SectionGallery } from '@/interfaces';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';
import { ColumnImage } from '@/tiny-url';

type Props = {
	section: SectionGallery;
	theme: string;
};

const PreviewSectionGallery: React.FC<Props> = ({ section, theme }) => {
	return (
		<div className="w-full">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
				{[1, 2, 3].map(column => (
					<ColumnImage
						key={column}
						section={section as SectionGallery}
						theme={theme}
						column={column}
					/>
				))}
			</div>
		</div>
	);
};

export default PreviewSectionGallery;
