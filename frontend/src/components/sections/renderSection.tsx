import { FC } from 'react';
import DeleteDivider from './deleteDivider';
import DeleteText from './deleteText';
import DeleteImage from './deleteImage';
import DeleteImageText from './deleteImageText';
import DeleteEmbeddedMedia from './deleteEmbeddedMedia';
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
	section: Section;
};

const RenderSection: FC<Props> = ({ section }) => {
	switch (section.kind) {
		case 'SectionDivider':
			return (
				<>
					<DeleteDivider sectionId={section.item.id} />
					<div
						key={section.id}
						className="text-base border-b mb-3 pb-5"
						dangerouslySetInnerHTML={{
							__html: (section as SectionDivider).item.title
						}}
					/>
				</>
			)
		case 'SectionText':
			return (
				<>
					<DeleteText sectionId={section.item.id} />
					<div
						className={
							`flex ${
								((section as SectionText).item.position === 'center')
									? 'justify-center'
									: ((section as SectionText).item.position === 'right')
										? 'justify-end'
										: ''
							}`
						}>
						<div key={section.item.id} className="w-3/4">
							<div 
								className="text-xl"
								dangerouslySetInnerHTML={{
									__html: (section as SectionText).item.heading
								}}
							/>
							<div
								className="text-base"
								dangerouslySetInnerHTML={{
									__html: (section as SectionText).item.content
								}}
							/>
						</div>
					</div>
				</>
			);
		case 'SectionImage':
			return (
				<>
					<DeleteImage sectionId={section.item.id} />
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
							<div
								className="text-base"
								dangerouslySetInnerHTML={{
									__html: (section as SectionImage).item.caption
								}}
							/>
						</div>
					</div>
				</>
			);
		case 'SectionImageText':
			return (
				<>
					<DeleteImageText sectionId={section.item.id} />

					<div className={
						`flex justify-evenly ${
							((section as SectionImageText).item.position === 'text_img')
								? 'flex-row-reverse'
								: ''
						}`
					}>
						<div className="w-1/3" key={`img-${section.item.id}`}>
							<img
								src={(section as SectionImageText).item.imgUrl}
								alt={(section as SectionImageText).item.imgAlt}
							/>
							<div
								className="text-base"
								dangerouslySetInnerHTML={{
									__html: (section as SectionImageText).item.imgCaption
									}}
								/>
						</div>

						<div className="w-1/3" key={`text-${section.item.id}`}>
							<div
								className="text-xl"
								dangerouslySetInnerHTML={{
									__html: (section as SectionImageText).item.txtHeading
								}}
								/>
							<div
								className="text-base"
								dangerouslySetInnerHTML={{
									__html: (section as SectionImageText).item.txtContent
								}}
								/>
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
