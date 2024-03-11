import DeleteDivider from './deleteDivider';
import DeleteText from './deleteText';
import DeleteImage from './deleteImage';
import DeleteImageText from './deleteImageText';
import DeleteEmbeddedMedia from './deleteEmbeddedMedia';
import {
	SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider
} from '@/interfaces';
import InputSectionDivider from './inputSectionDivider';
import InputSectionImage from './inputSectionImage';
import InputSectionTextHeading from './inputSectionTextHeading';
import InputSectionTextContent from './inputSectionTextContent';
import InputSectionImageTextHeading from './inputSectionImageTextHeading';
import InputSectionImageTextContent from './inputSectionImageTextContent';
import InputSectionImageTextCaption from './inputSectionImageTextCaption';
import ChangePositionSectionImageText from './positionSectionImageText';
import ChangePositionSectionImage from './positionSectionImage';
import ChangePositionSectionText from './positionSectionText';

type Section =
	| SectionText
	| SectionImage
	| SectionEmbeddedMedia
	| SectionImageText
	| SectionDivider;

type Props = {
	section: Section;
};

const RenderSection: React.FC<Props> = ({ section }) => {
	switch (section.kind) {
		case 'SectionDivider':
			return (
				<>
					<DeleteDivider sectionId={section.item.id} />
					<div className='border-transparent border-2 hover:border-gray-300'>
						<InputSectionDivider section={section as SectionDivider} />
					</div>
				</>
			)
		case 'SectionText':
			return (
				<>
					<DeleteText sectionId={section.item.id} />
					<ChangePositionSectionText section={section as SectionText}/>
					<div
						className={
							`flex ${
								((section as SectionText).item.position === 'center')
									? 'justify-center'
									: ((section as SectionText).item.position === 'right')
										? 'justify-end'
										: ''
							}
							`
						}>
						<div key={section.item.id} className="w-3/4 border-transparent border-2 hover:border-gray-300">
							<InputSectionTextHeading section={section as SectionText}/>
							<InputSectionTextContent section={section as SectionText} />
						</div>
					</div>
				</>
			);
		case 'SectionImage':
			return (
				<>
					<DeleteImage sectionId={section.item.id} />
					<ChangePositionSectionImage section={section as SectionImage} />
					<div
						className={
							`flex ${
								((section as SectionImage).item.position === 'center')
									? 'justify-center'
									: ((section as SectionImage).item.position === 'right')
										? 'justify-end'
										: ''
							}`
						}
					>
						<div className="w-1/2" key={section.item.id}>
							<img
								src={(section as SectionImage).item.url}
								alt={(section as SectionImage).item.alt}
							/>
							<div className='border-transparent border-2 hover:border-gray-300'>
							<InputSectionImage section={section as SectionImage}/>
							</div>
						</div>
					</div>
				</>
			);
		case 'SectionImageText':
			return (
				<>
					<DeleteImageText sectionId={section.item.id} />
					<ChangePositionSectionImageText section={section as SectionImageText} />
					<div className={
						`flex justify-evenly ${
							((section as SectionImageText).item.position === 'text_img')
								? 'flex-row-reverse'
								: ''
						}`
					}>
						<div className="w-1/2" key={`img-${section.item.id}`}>
							<img
								src={(section as SectionImageText).item.imgUrl}
								alt={(section as SectionImageText).item.imgAlt}
							/>
							<div className='border-transparent border-2 hover:border-gray-300'>
							<InputSectionImageTextCaption section={section as SectionImageText}/>
							</div>
						</div>

						<div className="w-1/2 border-transparent border-2 hover:border-gray-300" key={`text-${section.item.id}`}>
							<InputSectionImageTextHeading section={section as SectionImageText} />
							<InputSectionImageTextContent section={section as SectionImageText}/>
						</div>
					</div>
				</>
			);
		case 'SectionEmbeddedMedia':
			return (
				<>
					<DeleteEmbeddedMedia sectionId={section.item.id} />
					<div
						key={section.item.id}
						dangerouslySetInnerHTML={{
							__html: (section as SectionEmbeddedMedia).item.code
						}}
					/>
				</>
			);
		default:
			return null;
	}
};

export default RenderSection;
