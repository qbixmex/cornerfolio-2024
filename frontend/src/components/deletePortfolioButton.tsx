'use client';

import { deletePortfolio } from '@/api/deletePortfolioById.fetch';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import Swal from 'sweetalert2';

function DeletePortfolioButton({ id }: { id: string }) {

	const dispatch = useAppDispatch();
	
	const deletePortfolioById = async (id: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deletePortfolio(id);
				dispatch(setToast({ message: "Portfolio deleted successfully", type: "success" }));
			}
		});
	};

	return (
		<button
			className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => deletePortfolioById(id)}
		>
			Delete
		</button>
	);
}

export default DeletePortfolioButton;
