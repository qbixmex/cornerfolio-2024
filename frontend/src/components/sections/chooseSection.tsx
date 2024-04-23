'use client';

import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppSelector } from '@/store';
import { MdAdd } from 'react-icons/md';
import CreateDivider from './createDivider';
import CreateEmbeddedMedia from './createEmbeddedMedia';
import CreateImage from './createImage';
import CreateImageText from './createImageText';
import CreateText from './createText';
import CreateColumn from './createColumn';
import CreateGallery from './createGallery';

type Props = {
	portfolioId: string;
	order: number;
};

const ChooseSection: React.FC<Props> = ({ portfolioId, order }) => {
	const reloading = useAppSelector((state) => state.reloading.reloading);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(false);
	}, [reloading]);

	const onOpenModal = () => {
		setIsOpen(true);
	};

	const onCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Open modal button */}
			<div className="relative flex justify-center z-10 mt-5 mb-10">
				<div className="absolute top-[50%] translate-y-[-25%] z-0 w-[100%] h-[2px] bg-gray-200" />
				<button
					className={"relative z-1 bg-slate-600 hover:bg-slate-500 p-2 border-white rounded text-white transition-colors"}
					type="button"
					onClick={onOpenModal}
				><MdAdd size={20} /></button>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="fixed z-40 top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-10 transform scale-100 transition-transform duration-300">
					{/* Modal content */}
					<div className="relative bg-white text-stone-700 w-3/4 h-[300px] max-md:h-3/4 p-12 rounded-md grid place-content-center">
						{/* Close modal button */}
						<div className="absolute top-5 right-5">
							<button className="focus:outline-none" type="button" onClick={onCloseModal}>
								<FaTimes />
							</button>
						</div>
						{/* Modal content */}
						<div className="flex flex-col items-center">
							<h2 className="text-lg lg:text-5xl mb-5">Add section</h2>

							<section className="flex flex-wrap justify-center gap-3">
								<CreateText
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>
								
								<CreateImage
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>

								<CreateImageText
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>

								<CreateEmbeddedMedia
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>

								<CreateDivider
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>

								<CreateColumn
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>

								<CreateGallery
									portfolioId={portfolioId}
									order={order}
									onCloseModal={onCloseModal}
								/>
							</section>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ChooseSection;
