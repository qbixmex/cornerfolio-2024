"use client";

import { FaTrash } from 'react-icons/fa';
import { deleteSectionColumn } from '@/sections/actions/section.action';
import { useAppDispatch } from '@/store';
import Swal from 'sweetalert2';
import { resetToast, setToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	sectionId: string;
};

const DeleteColumn: React.FC<Props> = ({ portfolioId, sectionId }) => {
	const dispatch = useAppDispatch();

	const handleDeleteColumn = async () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then(async (result) => {
			if (result.isConfirmed) {
				const data = await deleteSectionColumn(portfolioId, sectionId);

				if ("error" in data) {
					dispatch(setToast({ message: data.error, type: "error" }));
				}

				if ("message" in data) {
					dispatch(setToast({ message: data.message, type: "success" }));
				}

				setTimeout(() => dispatch(resetToast()), 3000);
			}
		});
	};

	return (
		<button
			className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
			onClick={handleDeleteColumn}
		>
			<FaTrash />
		</button>
	);
};

export default DeleteColumn;
