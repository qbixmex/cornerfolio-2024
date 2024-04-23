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

import ImageSkeleton from './imageSkeleton';
import { useAppSelector } from '@/store';
import { ColumnGallery } from '@/sections/components';
import clsx from 'clsx';
import styles from  "./renderSection.module.css"

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
						<div className="w-full lg:w-3/4">
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
						<section className="w-full lg:w-[80%]" key={section.item.id}>
							{
								loadingImage && imageId === (section as SectionImage).item.id
									? <ImageSkeleton className="max-w-[1280px] max-h-[720px] mx-auto" />
									: (
										<Image
											className="mx-auto rounded-md"
											src={(section as SectionImage).item.url}
											alt={(section as SectionImage).item.alt}
											width={1280}
											height={720}
										/>
									)
							}

							<div className='border-transparent border-2 hover:border-gray-300'>
								<UploadSectionImage portfolioId={portfolioId} section={section as SectionImage} />
							</div>
							<div className='border-transparent border-2 hover:border-gray-300'>
								<InputSectionImage portfolioId={portfolioId} section={section as SectionImage} />
							</div>
						</section>
					</div>
					<div className="text-right">
						<DeleteImage portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</div>
			);
		case 'SectionImageText':
			return (
				<section>
					<ChangePositionSectionImageText portfolioId={portfolioId} section={section as SectionImageText} />

					<section className={clsx("flex", {
						"flex-col lg:flex-row": ((section as SectionImageText).item.position === 'img_text'),
						"flex-col-reverse lg:flex-row-reverse": ((section as SectionImageText).item.position === 'text_img')
					})}>
						<section className="w-full lg:w-1/2 flex flex-col items-center" key={section.item.id}>
							{
								
								loadingImage && imageId === (section as SectionImageText).item.id
									? <ImageSkeleton className="w-full h-full max-w-[400px] max-h-[400px] mx-auto" />
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

							<div className='border-transparent border rounded-md hover:border-gray-200 mb-5 w-full lg:mb-0'>
								<InputSectionImageTextCaption portfolioId={portfolioId} section={section as SectionImageText} />
							</div>
						</section>

						<section className="w-full lg:w-1/2 flex flex-col items-center">
							<InputSectionImageTextHeading portfolioId={portfolioId} section={section as SectionImageText} />
							<InputSectionImageTextContent portfolioId={portfolioId} section={section as SectionImageText} />
						</section>
					</section>
					<div className="text-right">
						<DeleteImageText portfolioId={portfolioId} sectionId={section.item.id} />
					</div>
				</section>
			);
		case 'SectionEmbeddedMedia':
			return (
				<>
					<div className={styles.sectionEmbeddedMedia}
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
							{[1, 2, 3].map((column) => (
								<section key={column}>
									<InputSectionColumnHeading
										position={column as 1 | 2 | 3}
										section={section as SectionColumn}
									/>
									<InputSectionColumnContent
										position={column as 1 | 2 | 3}
										section={section as SectionColumn}
									/>
								</section>
							))}
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
						{[1, 2, 3].map((column) => (
							<ColumnGallery
								key={section.item.id}
								imageId={imageId!}
								portfolioId={portfolioId}
								section={section as SectionGallery}
								column={column}
							/>
						))}
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
