"use client";

import Image from 'next/image';
import DeleteDivider from './deleteDivider';
import DeleteText from './deleteText';
import DeleteImage from './deleteImage';
import DeleteImageText from './deleteImageText';
import DeleteEmbeddedMedia from './deleteEmbeddedMedia';
import DeleteColumn from './deleteColumn';
import DeleteGallery from './deleteGallery';
import {
	SectionText,
	SectionImage,
	SectionEmbeddedMedia,
	SectionImageText,
	SectionDivider,
	SectionColumn,
	SectionGallery,
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

import ImageSkeleton from './imageSkeleton';
import { useAppSelector } from '@/store';
import clsx from 'clsx';
import { Suspense } from 'react';

type Section =
	| SectionText
	| SectionImage
	| SectionEmbeddedMedia
	| SectionImageText
	| SectionDivider
	| SectionColumn
	| SectionGallery

type Props = {
	portfolioId: string;
	section: Section;
};

const RenderSection: React.FC<Props> = ({ portfolioId, section }) => {
	const { imageId, loadingImage } = useAppSelector(state => state.imageUpload);

	switch (section.kind) {
		case 'SectionDivider':
			return (
				<div className='border w-full'>
					<div className='border-transparent border-2 hover:border-gray-300'>
						<InputSectionDivider section={section as SectionDivider} />
					</div>
					<div className="text-right">
						<DeleteDivider portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</div>
			)
		case 'SectionText':
			return (
				<div className='w-full mt-5'>
					<ChangePositionSectionText portfolioId={portfolioId} section={section as SectionText} />
					<div
						className={`flex border w-full mt-5
							${((section as SectionText).item.position === 'center')
								? 'justify-center'
								: ((section as SectionText).item.position === 'right')
									? 'justify-end'
									: ''
							}
						`}>
						<div key={section.item.id} className="w-3/4 max-md:w-full">
							<InputSectionTextHeading portfolioId={portfolioId} section={section as SectionText} />
							<InputSectionTextContent portfolioId={portfolioId} section={section as SectionText} />
						</div>
					</div>
					<section className="text-right">
						<DeleteText portfolioId={portfolioId} sectionId={section.item.id} />
					</section>
				</div>
			);
		case 'SectionImage':
			return (
				<div>					
					<ChangePositionSectionImage portfolioId={portfolioId} section={section as SectionImage} />
					<div
						className={clsx("flex", {
							"justify-start": (section as SectionImage).item.position === 'right',
							"justify-end": (section as SectionImage).item.position === 'right',
							"justify-center": (section as SectionImage).item.position === 'center'
						})}
					>
						<div className="w-1/2 max-sm:w-full" key={section.item.id}>
							{
								loadingImage && imageId === (section as SectionImage).item.id
									? <ImageSkeleton className="max-w-[400px] max-h-[400px] mx-auto" />
									: (
										<Image
											className="mx-auto rounded-md"
											src={(section as SectionImage).item.url}
											alt={(section as SectionImage).item.alt}
											width={500}
											height={500}
										/>
									)
							}

							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionImage portfolioId={portfolioId} section={section as SectionImage} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionImage portfolioId={portfolioId} section={section as SectionImage} />
							</div>
						</div>
					</div>
					<div className="text-right">
						<DeleteImage portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</div>
			);
		case 'SectionImageText':
			return (
				<div>
					<ChangePositionSectionImageText portfolioId={portfolioId} section={section as SectionImageText} />
					<div className={`flex justify-evenly items-center  max-sm:flex-col ${((section as SectionImageText).item.position === 'text_img')
							? 'flex-row-reverse max-sm:flex-col-reverse'
							: ''
						}`}>
						<div className="w-1/2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center">
							{
								loadingImage && (section as SectionImageText).item.id
									? (<ImageSkeleton className="max-w-[400px] max-h-[400px] mx-auto" />)
									: (
										<Image
											className="mx-auto rounded-md"
											src={(section as SectionImageText).item.imgUrl}
											alt={(section as SectionImageText).item.imgAlt}
											width={500}
											height={500}
										/>
									)
							}

							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionImageText portfolioId={portfolioId} section={section as SectionImageText} />
							</div>

							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionImageTextCaption portfolioId={portfolioId} section={section as SectionImageText} />
							</div>
						</div>

						<div className="w-1/2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-center" key={`text-${section.item.id}`}>
							<InputSectionImageTextHeading portfolioId={portfolioId} section={section as SectionImageText} />
							<InputSectionImageTextContent portfolioId={portfolioId} section={section as SectionImageText} />
						</div>
					</div>
					<div className="text-right">
						<DeleteImageText portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</div>
			);
		case 'SectionEmbeddedMedia':
			return (
				<>
					<div className='flex justify-center'
						key={section.item.id}
						dangerouslySetInnerHTML={{ __html: (section as SectionEmbeddedMedia).item.code }}
					/>
					<div className="text-right">
						<DeleteEmbeddedMedia portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</>
			);
		case 'SectionColumn':
			return (
				<div className='w-full'>
					<div className={`flex border w-full`}>
						<div key={section.item.id} className="w-full flex max-sm:flex-col">
							<div>
								<InputSectionColumnHeading position={1} section={section as SectionColumn} />
								<InputSectionColumnContent position={1} section={section as SectionColumn} />
							</div>
							<div>
								<InputSectionColumnHeading position={2} section={section as SectionColumn} />
								<InputSectionColumnContent position={2} section={section as SectionColumn} />
							</div>
							<div>
								<InputSectionColumnHeading position={3} section={section as SectionColumn} />
								<InputSectionColumnContent position={3} section={section as SectionColumn} />
							</div>
						</div>
					</div>
					<div className="text-right">
						<DeleteColumn portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</div>
			);

		case 'SectionGallery':
			return (
				<>
					<div className="w-full flex gap-3 items-center max-sm:flex-col ">
						{/* image1 */}
						<div className="w-1/3 min-h-[500px]  max-sm:w-full m-1 " key={`1-${section.item.id}`}>
							
							{
								(imageId === `${section.item.id}-1`)
									? <ImageSkeleton className="max-w-[400px] max-h-[400px] mx-auto" />
									: (
										<Image
											className="mx-auto rounded-md"
											src={(section as SectionGallery).item.url1}
											alt={(section as SectionGallery).item.alt1}
											width={500}
											height={500}
										/>
									)
							}

							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionGallery position={1} portfolioId={portfolioId} section={section as SectionGallery} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionGallery position={1} section={section as SectionGallery} />
							</div>
						</div>

						{/* image2 */}
						<div className="w-1/3 min-h-[500px] max-sm:w-full m-1" key={`2-${section.item.id}`}>
							{
								(imageId === `${section.item.id}-2`)
									? <ImageSkeleton className="max-w-[400px] max-h-[400px] mx-auto" />
									: (
										<Image
											className="mx-auto rounded-md"
											src={(section as SectionGallery).item.url2}
											alt={(section as SectionGallery).item.alt2}
											width={500}
											height={500}
										/>
									)
							}

							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionGallery position={2} portfolioId={portfolioId} section={section as SectionGallery} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionGallery position={2} section={section as SectionGallery} />
							</div>
						</div>

						{/* image3 */}
						<div className="w-1/3 min-h-[500px] max-sm:w-full m-1" key={`3-${section.item.id}`}>
							{
								(imageId === `${section.item.id}-3`)
									? <ImageSkeleton className="max-w-[400px] max-h-[400px] mx-auto" />
									: (
										<Image
											className="mx-auto rounded-md"
											src={(section as SectionGallery).item.url3}
											alt={(section as SectionGallery).item.alt3}
											width={500}
											height={500}
										/>
									)
							}

							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionGallery position={3} portfolioId={portfolioId} section={section as SectionGallery} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionGallery position={3} section={section as SectionGallery} />
							</div>
						</div>
					</div>
					<div className="text-right">
						<DeleteGallery portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</>
			);
		default:
			return null;
	}
};

export default RenderSection;
