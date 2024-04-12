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
import clsx from 'clsx';

type Props = {
	portfolioId: string;
	order: number;
	theme: string;
};

const ChooseSection: React.FC<Props> = ({ portfolioId, order, theme }) => {
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
					className={clsx("relative z-1 bg-slate-600 hover:bg-slate-500 p-2 border-white rounded text-white transition-colors", {
						"shadow-[0_0_0_20px_rgb(255,255,255)]": theme === "light",
						"shadow-[0_0_0_20px_rgb(0,0,0)]": theme === "dark",
						"shadow-[0_0_0_20px_#13141b]": theme === "modern",
					})}
					type="button"
					onClick={onOpenModal}
				><MdAdd size={20} /></button>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="text-black fixed z-10 top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-100 transition-transform duration-300">
					{/* Modal content */}
					<div className="bg-[#13141A] text-white w-1/2 h-1/2 p-12 rounded-md">
						{/* Close modal button */}
						<div className="text-right">
							<button className="focus:outline-none" type="button" onClick={onCloseModal}>
								<FaTimes />
							</button>
						</div>
						{/* Modal content */}
						<div className='flex flex-col items-center'>
							<h2 className="text-xl">Add section</h2>

							<section className="border rounded-md flex flex-wrap justify-center gap-3">
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
