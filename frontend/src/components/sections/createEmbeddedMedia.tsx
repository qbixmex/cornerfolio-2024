'use client';

import { createSectionEmbeddedMedia } from '@/sections/actions/section.action';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FaTimes, FaVideo } from 'react-icons/fa';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateEmbeddedMedia: FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const dispatch = useAppDispatch();
	const reloading = useAppSelector((state) => state.reloading.reloading);
	const [isOpen, setIsOpen] = useState(false);
	const [code, setCode] = useState('');

	useEffect(() => {
		setIsOpen(false);
	}, [reloading]);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setCode(event.target.value);
	};

	const handleCreateEmbeddedMedia = async () => {
		// Regex pattern
		const iframePattern = /^<iframe(?:\s[^>]*)?><\/iframe>$/i;

		if (!iframePattern.test(code)) {
			alert('Please enter a valid iframe code.');
			return;
		}

		const data = await createSectionEmbeddedMedia(portfolioId, order, code);

		if ('error' in data) {
			dispatch(setToast({ message: data.error, type: 'error' }));
		}

		if ('message' in data) {
			dispatch(setToast({ message: data.message, type: 'success' }));
		}

		setTimeout(() => dispatch(resetToast()), 3000);
		onCloseModal();
	};

	return (
		<>
			{/*  Open Modal */}
			<div className="flex flex-col items-center">
				<button
					className="w-fit border-none m-4 bg-slate-700 text-white px-5 py-3 rounded transition-colors hover:bg-slate-600 focus:outline-none"
					onClick={openModal}
					type="button"
				>
					<FaVideo className="text-lg text-white" />
				</button>
				<span className="text-sm">Video</span>
			</div>

			{/* Modal */}
			{isOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-30 transform scale-100 transition-transform duration-300 z-40 ">
					{/* Modal content */}
					<div className={`bg-stone-100 w-1/2 h-1/2 p-12 rounded-md`}>
						{/* Close modal button */}
						<div className='text-right'>
							<button className="focus:outline-none" type="button" onClick={closeModal}>
								{/* Hero icon - close button */}
								<FaTimes />
							</button>
						</div>
						{/* Modal content */}
						<section className="flex flex-col items-center">
							<h2 className="text-lg lg:text-2xl text-stone-700 mb-5">Add {"<Iframe>"}</h2>
							<textarea
								onChange={handleCodeChange}
								value={code}
								rows={5}
								className="outline-none border border-gray-200 bg-white p-3 font-normal rounded-md text-gray-400 w-full text-sm"
							></textarea>
							<div className="w-full text-center lg:text-right">
								<button
									className="my-5 outline-none border-0 w-fit border-none bg-blue-700 text-white px-4 py-2 rounded transition-colors hover:bg-blue-800 focus:outline-none font-semibold text-base"
									onClick={handleCreateEmbeddedMedia}
								>
									save
								</button>
							</div>
							<p className="text-xs">* Please paste {'<iframe></iframe>'} code.</p>
						</section>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateEmbeddedMedia;
