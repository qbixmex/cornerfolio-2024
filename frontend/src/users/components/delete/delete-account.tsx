import Swal from 'sweetalert2';
import { deleteUser } from '@/users/actions/user.actions';

const DeleteAccount: React.FC<{ userId: string }> = ({ userId }) => {
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
		<form
			action={handleDeleteUser}
			className="w-full"
		>
			<section className="w-full">
				<button
					type="submit"
					className="flex w-full md:w-[150px] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
				>
					delete
				</button>
			</section>
		</form>
	);
};

export default DeleteAccount;
