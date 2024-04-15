import Swal from 'sweetalert2';
import { deleteUser } from '@/users/actions/user.actions';
import { useDispatch } from 'react-redux';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { redirect } from 'next/navigation';

type Props = {
	userId: string;
};

const DeleteAccount: React.FC<Props> = ({ userId }) => {
	const dispatch = useDispatch();

	const handleDeleteUser = () => {

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
				await deleteUser(userId);
			}
		});

	};

	return (
		<form className="w-full" action={handleDeleteUser}>
			<div className="w-full">
				<button
					type="submit"
					className="flex w-full md:w-[50%] h-14 lg:h-auto justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-lg lg:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
				>
					delete
				</button>
			</div>
		</form>
	);
};

export default DeleteAccount;
