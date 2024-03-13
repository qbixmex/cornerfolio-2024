import { FaTrash } from 'react-icons/fa';
import { deleteSectionDivider } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	sectionId: string;
};

const DeleteDivider: React.FC<Props> = ({ sectionId }) => {
	const dispatch = useAppDispatch()
	const handleDeleteDivider = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await deleteSectionDivider(sectionId)
		} catch (error) {
			console.error('Error deleting text:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<button
			className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
			onClick={handleDeleteDivider}
		>
			<FaTrash />
		</button>
	);
};

export default DeleteDivider;
