"use client";

import { createSectionImage } from '@/sections/actions/section.action';
import { FaImage } from 'react-icons/fa';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};
const CreateImage: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const dispatch = useAppDispatch();

	const handleCreateImage = async () => {
		const data = await createSectionImage(portfolioId, order);

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
				onClick={handleCreateImage}
				type="button"
			>
				<FaImage className="text-lg text-white" />
			</button>
			<span className="text-sm">Image</span>
		</div>
	);
};

export default CreateImage;
