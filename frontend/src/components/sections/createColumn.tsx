"use client";

import { createSectionColumn } from '@/sections/actions/section.action';
import { PiTextColumns } from 'react-icons/pi';
import { Button } from '@nextui-org/react';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { useAppDispatch } from '@/store';
import { setToast, resetToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateColumn: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const dispatch = useAppDispatch();

	const handleCreateColumn = async () => {
		const data = await createSectionColumn(portfolioId, order);

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
				onClick={handleCreateColumn}
				type="button"
			>
				<PiTextColumns className="text-lg text-white" />
			</button>
			<span className="text-sm">Column</span>
		</div>
	);
};

export default CreateColumn;
