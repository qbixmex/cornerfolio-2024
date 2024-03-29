import {
	SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider
} from '@/interfaces';
import PreviewSectionDivider from './PreviewSectionDivider';
import PreviewSectionImage from './PreviewSectionImage';
import PreviewSectionText from './PreviewSectionText';
import PreviewSectionImageText from './PreviewSectionImageText';
// import InputSectionImageTextHeading from './inputSectionImageTextHeading';
// import InputSectionImageTextContent from './inputSectionImageTextContent';
// import InputSectionImageTextCaption from './inputSectionImageTextCaption';

type Section =
	| SectionText
	| SectionImage
	| SectionEmbeddedMedia
	| SectionImageText
	| SectionDivider;

type Props = {
	section: Section;
};

const PreviewRenderSection: React.FC<Props> = ({ section }) => {
	switch (section.kind) {
		case 'SectionDivider':
			return (
				<div className='  w-full'>		
				    <PreviewSectionDivider section={section as SectionDivider}/>
				</div>
			)
		case 'SectionText':
			return (	
				<PreviewSectionText section={section as SectionText}/>
			);
		case 'SectionImage':
			return (
				<PreviewSectionImage section={section as SectionImage} />
			);
		case 'SectionImageText':
			return (
                <PreviewSectionImageText section={section as SectionImageText}/>
			);
		case 'SectionEmbeddedMedia':
			return (
				<div className='flex justify-center'>
					<div
						key={section.item.id}
						dangerouslySetInnerHTML={{
							__html: (section as SectionEmbeddedMedia).item.code
						}}
					/>
				</div>
			);
		default:
			return null;
	}
};

export default PreviewRenderSection;
