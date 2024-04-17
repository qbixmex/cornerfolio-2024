"use client";

import { createSectionText } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { BiText } from 'react-icons/bi';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
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
			<Button
				color="primary"
				variant="shadow"
				size="sm"
				fullWidth={true}
				className={`w-fit border-none bg-gradient-to-tr from-blue-900 to-cyan-600 m-4 bg-gray-200 hover:bg-gray-300 ${modern.addSectionButtonsBackground}`}
				onClick={handleCreateText}
				type="button"
			>
				<BiText className="text-lg text-white" />
			</Button>
			<span className="text-sm">Text</span>
		</div>
	);
};

export default CreateText;
