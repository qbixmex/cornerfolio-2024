import { FaTrash } from 'react-icons/fa';
import { deleteSectionColumn } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	sectionId: string;
};

const DeleteColumn: React.FC<Props> = ({ sectionId }) => {
	const dispatch=useAppDispatch()
	const handleDeleteColumn = async () => {
		deleteSectionColumn(sectionId)
		try {
			dispatch(setReloading(true)); // reloading true
			await deleteSectionColumn(sectionId)
		} catch (error) {
			console.error('Error deleting column:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
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