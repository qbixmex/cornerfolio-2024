"use client";

import { createSectionGallery } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { BsFileImage } from 'react-icons/bs';
import { BsFileImageFill } from 'react-icons/bs';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};
const CreateGallery: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const dispatch = useAppDispatch();

	const handleCreateGallery = async () => {
		const data = await createSectionGallery(portfolioId, order);

		if ("error" in data) {
			dispatch(setToast({ message: data.error, type: "error" }));
		}

		if ("message" in data) {
			dispatch(setToast({ message: data.message, type: "success" }));
		}

		setTimeout(() => dispatch(resetToast()), 3000);
		onCloseModal();
	};

	return (
		<div className="flex flex-col items-center">
			<button
				className="w-fit border-none m-4 bg-slate-700 text-white px-5 py-3 rounded transition-colors hover:bg-slate-600 focus:outline-none"
				onClick={handleCreateGallery}
				type="button"
			>
				<section className="flex gap-1">
					<BsFileImage className="text-lg text-white" />
					<BsFileImageFill className="text-lg text-white" />
				</section>
			</button>
			<span className="text-sm">Gallery</span>
		</div>
	);
};

export default CreateGallery;
