"use client";

import { createSectionText } from '@/sections/actions/section.action';
import { GrTextAlignFull } from "react-icons/gr";
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateText: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const dispatch = useAppDispatch();

	const handleCreateText = async () => {
		const data = await createSectionText(portfolioId, order);

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
				className={"w-fit border-none m-4 bg-slate-700 text-white px-5 py-3 rounded transition-colors hover:bg-slate-600 focus:outline-none"}
				onClick={handleCreateText}
				type="button"
			>
				<GrTextAlignFull className="text-lg text-white" />
			</button>
			<span className="text-sm">Text</span>
		</div>
	);
};

export default CreateText;
