"use client";

import { createSectionImageText } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { GrTextWrap } from 'react-icons/gr';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateImageText: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const dispatch = useAppDispatch();

	const handleCreateImageText = async () => {
		const data = await createSectionImageText(portfolioId, order);

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
			<Button
				color="primary"
				variant="shadow"
				size="sm"
				fullWidth={true}
				className={`w-fit border-none bg-gradient-to-tr from-blue-900 to-cyan-600 m-4 bg-gray-200 hover:bg-gray-300 ${modern.addSectionButtonsBackground}`}
				onClick={handleCreateImageText}
				type="button"
			>
				<GrTextWrap className="text-lg text-white" />
			</Button>
			<span className="text-sm mb-2.5">Image-Text</span>
		</div>
	);
};

export default CreateImageText;
