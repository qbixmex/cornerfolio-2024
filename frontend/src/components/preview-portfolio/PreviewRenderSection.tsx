import {
	SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider, SectionColumn, SectionGallery
} from '@/interfaces';
import PreviewSectionColumn from './PreviewSectionColumn';
import PreviewSectionDivider from './PreviewSectionDivider';
import PreviewSectionImage from './PreviewSectionImage';
import PreviewSectionImageText from './PreviewSectionImageText';
import PreviewSectionGallery from './PreviewSectionGallery';
import PreviewSectionText from './PreviewSectionText';
import styles from "@/app/[tinyUrl]/tiny-url.module.css";

type Section =
	| SectionText
	| SectionImage
	| SectionEmbeddedMedia
	| SectionImageText
	| SectionDivider
	| SectionColumn
	| SectionGallery

type Props = {
	section: Section;
	theme: string;
};

const PreviewRenderSection: React.FC<Props> = ({ section, theme }) => {
	switch (section.kind) {
		case 'SectionDivider':
			return (
				<h2 className={styles.divider}>
					<PreviewSectionDivider theme={theme} section={section as SectionDivider} />
				</h2>
			);
		case 'SectionText':
			return (
				<PreviewSectionText
					theme={theme}
					section={section as SectionText}
				/>
			);
		case 'SectionImage':
			return (
				<PreviewSectionImage
					theme={theme}
					section={section as SectionImage}
				/>
			);
		case 'SectionImageText':
			return (
				<PreviewSectionImageText
					theme={theme}
					section={section as SectionImageText}
				/>
			);
		case 'SectionEmbeddedMedia':
			return (
				<div
					className={styles.sectionEmbeddedMedia}
					key={section.item.id}
					dangerouslySetInnerHTML={{ __html: (section as SectionEmbeddedMedia).item.code }}
				/>
			);
		case 'SectionColumn':
			return (
				<PreviewSectionColumn
					theme={theme}
					section={section as SectionColumn}
				/>
			);
		case 'SectionGallery':
			return (
				<PreviewSectionGallery
					theme={theme}
					section={section as SectionGallery}
				/>
			);
		default:
			return null;
	}
};

export default PreviewRenderSection;
