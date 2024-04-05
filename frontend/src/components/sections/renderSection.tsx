import DeleteDivider from './deleteDivider';
import DeleteText from './deleteText';
import DeleteImageText from './deleteImageText';
import DeleteEmbeddedMedia from './deleteEmbeddedMedia';
import DeleteColumn from './deleteColumn';
import DeleteGallery from './deleteGallery';
import {
	SectionText, SectionImage, SectionEmbeddedMedia, SectionImageText, SectionDivider, SectionColumn,SectionGallery
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
import UploadSectionImage from './uploadSectionImage';
import UploadSectionImageText from './uploadSectionImageText';
import InputSectionColumnHeading from './inputSectionColumnHeading';
import InputSectionColumnContent from './inputSectionColumnContent';
import InputSectionGallery from './inputSectionGallery';
import UploadSectionGallery from './uploadSectionGallery';

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
};

const RenderSection: React.FC<Props> = ({ section }) => {
	switch (section.kind) {
		case 'SectionDivider':
			return (
				<div className='border w-full'>
					<DeleteDivider sectionId={section.item.id} />
					<div className='border-transparent border-2 hover:border-gray-300'>
						<InputSectionDivider section={section as SectionDivider} />
					</div>
				</div>
			)
		case 'SectionText':
			return (
				<div className='w-full'>
					<DeleteText sectionId={section.item.id} />
					<ChangePositionSectionText section={section as SectionText}/>
					<div
						className={`flex border w-full
							${ ((section as SectionText).item.position === 'center')
								? 'justify-center'
								: ((section as SectionText).item.position === 'right')
									? 'justify-end'
									: ''
							}
						`}>
						<div key={section.item.id} className="w-3/4">
							<InputSectionTextHeading section={section as SectionText}/>
							<InputSectionTextContent section={section as SectionText} />
						</div>
					</div>
				</div>
			);
		case 'SectionImage':
			return (
				<>
					<DeleteGallery sectionId={section.item.id} />
					<ChangePositionSectionImage section={section as SectionImage} />
					<div
						className={`flex  ${
							((section as SectionImage).item.position === 'center')
								? 'justify-center'
								: ((section as SectionImage).item.position === 'right')
									? 'justify-end'
									: ''
						}`}
					>
						<div className="w-1/2 max-sm:w-full" key={section.item.id}>
							<img
								src={(section as SectionImage).item.url}
								alt={(section as SectionImage).item.alt}
							/>
							<div className='border-transparent border-2 hover:border-gray-300'>
							<UploadSectionImage section={section as SectionImage} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
							<InputSectionImage section={section as SectionImage} />
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
					<div className={`flex justify-evenly items-center  max-sm:flex-col ${
						((section as SectionImageText).item.position === 'text_img')
							? 'flex-row-reverse max-sm:flex-col-reverse'
							: ''
					}`}>
						<div className="w-1/2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center" key={`img-${section.item.id}`}>
							<img
								src={(section as SectionImageText).item.imgUrl}
								alt={(section as SectionImageText).item.imgAlt}
							/>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionImageText section={section as SectionImageText} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionImageTextCaption section={section as SectionImageText}/>
							</div>
						</div>

						<div className="w-1/2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center" key={`text-${section.item.id}`}>
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
					<div className='flex justify-center'
						key={section.item.id}
						dangerouslySetInnerHTML={{
							__html: (section as SectionEmbeddedMedia).item.code
						}}
					/>
				</>
			);
		case 'SectionColumn':
				return (
					<div className='w-full'>
						<DeleteColumn sectionId={section.item.id} />
						<div className={`flex border w-full`}>
							<div key={section.item.id} className="w-full flex max-sm:flex-col">
								<div>
									<InputSectionColumnHeading position={1} section={section as SectionColumn} />
									<InputSectionColumnContent position={1} section={section as SectionColumn}/>
								</div>
								<div>
									<InputSectionColumnHeading position={2} section={section as SectionColumn}/>
									<InputSectionColumnContent position={2} section={section as SectionColumn}/>
								</div>
								<div>
									<InputSectionColumnHeading position={3} section={section as SectionColumn}/>
									<InputSectionColumnContent position={3} section={section as SectionColumn}/>
								</div>
							</div>
						</div>
					</div>
				);

		case 'SectionGallery':
					return (
						<>
							<DeleteGallery sectionId={section.item.id} />
							
							<div className="w-full flex items-center max-sm:flex-col">
								{/* image1 */}
								<div className="w-1/3 max-sm:w-full m-1" key={`1-${section.item.id}`}>
									<img
										src={(section as SectionGallery).item.url1}
										alt={(section as SectionGallery).item.alt1}
									/>
									<div className='border-transparent border-2 hover:border-gray-300'>
									<UploadSectionGallery position={1} section={section as SectionGallery} />
									</div>
									<div className='border-transparent border-2 hover:border-gray-300'>
									<InputSectionGallery  position={1} section={section as SectionGallery} />
									</div>
								</div>
							
								{/* image2 */}
								<div className="w-1/3 max-sm:w-full m-1" key={`2-${section.item.id}`}>
									<img
										src={(section as SectionGallery).item.url2}
										alt={(section as SectionGallery).item.alt2}
									/>
									<div className='border-transparent border-2 hover:border-gray-300'>
									<UploadSectionGallery position={2} section={section as SectionGallery} />
									</div>
									<div className='border-transparent border-2 hover:border-gray-300'>
									<InputSectionGallery  position={2} section={section as SectionGallery} />
									</div>
								</div>
							
								{/* image3 */}
								<div className="w-1/3 max-sm:w-full m-1" key={`3-${section.item.id}`}>
									<img
										src={(section as SectionGallery).item.url3}
										alt={(section as SectionGallery).item.alt3}
									/>
									<div className='border-transparent border-2 hover:border-gray-300'>
									<UploadSectionGallery position={3} section={section as SectionGallery} />
									</div>
									<div className='border-transparent border-2 hover:border-gray-300'>
									<InputSectionGallery  position={3} section={section as SectionGallery} />
									</div>
								</div>
							</div>
						</>
					);
		default:
			return null;
	}
};

export default RenderSection;
