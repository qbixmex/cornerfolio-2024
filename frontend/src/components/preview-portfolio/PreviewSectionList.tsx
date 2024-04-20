import PreviewRenderSection from './PreviewRenderSection';
import {
	SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider
} from '@/interfaces';

type Section =
	| SectionText
	| SectionImage
	| SectionEmbeddedMedia
	| SectionImageText
	| SectionDivider;

type Props = {
	sections: Section[];
	portfolioId: string;
	theme: string;
};

const PreviewSectionsList: React.FC<Props> = ({ sections, theme }) => {
	return (
		<>
			{sections.map((section) => (
				<div key={section.item.id} className=''>
					<div className='flex justify-between'>
						<div className='mb-5 ml-5 mr-5 w-full'>
							<PreviewRenderSection theme={theme} section={section} />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default PreviewSectionsList;
