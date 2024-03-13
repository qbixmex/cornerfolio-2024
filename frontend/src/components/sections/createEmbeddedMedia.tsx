'use client';

import { ChangeEvent, FC, useState, useEffect } from 'react';
import { createSectionEmbeddedMedia } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { useAppSelector } from '@/store';

type Props = {
	portfolioId: string;
	order: number;
};

const CreateEmbeddedMedia: FC<Props> = ({ portfolioId, order }) => {
	const dispatch=useAppDispatch()
	const reloading = useAppSelector(state => state.reloading.reloading); 
	const [isOpen, setIsOpen] = useState(false);
	const [code, setCode] = useState('');

	useEffect(()=>{
		setIsOpen(false)
	},[reloading])

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

		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionEmbeddedMedia(portfolioId, order, code)
		} catch (error) {
			console.error('Error creating embedded-media:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}

	};

	return (
		<>
			{/*  Open Modal */}
			<button
				type="button"
				onClick={openModal}
				className='m-4 bg-gray-200 hover:bg-gray-300'
			>
				Video
			</button>

			{/* Modal */}
			{isOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-100 transition-transform duration-300">
					{/* Modal content */}
					<div className="bg-white w-1/2 h-1/2 p-12">
						{/* Close modal button */}
						<button className="focus:outline-none" type="button" onClick={closeModal}>
							{/* Hero icon - close button */}
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						{/* Modal content */}
						<section>
							<h2 className='text-xl'>Add Link</h2>
							<textarea onChange={handleCodeChange} value={code} className="border w-full h-[150px] text-sm"></textarea>
							<button
								className="m-4 bg-gray-200 hover:bg-gray-300"
								onClick={handleCreateEmbeddedMedia}>
								Insert Media
							</button>
							<p className='text-xs'>* Please paste {"<iframe></iframe>"} code.</p>
						</section>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateEmbeddedMedia;
