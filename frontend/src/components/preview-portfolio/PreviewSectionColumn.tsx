import { SectionColumn } from '@/interfaces';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import { ColumnItem } from '@/tiny-url';

type Props = {
	section: SectionColumn;
	theme: string;
};

const PreviewSectionColumn: React.FC<Props> = ({ section, theme }) => {

	return (
		<div className={styles.sectionColumnContainer}>
			{[1, 2, 3].map((column) => (
				<ColumnItem
					key={column}
					section={section}
					theme={theme}
					column={column}
				/>
			))}
		</div>
	);
};

export default PreviewSectionColumn;

