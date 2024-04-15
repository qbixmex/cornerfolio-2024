import { FaTrash } from 'react-icons/fa';
import { deleteSectionColumn } from '@/sections/actions/section.action';
import { useAppDispatch } from '@/store';

type Props = {
	portfolioId: string;
	sectionId: string;
};

const DeleteColumn: React.FC<Props> = ({ portfolioId, sectionId }) => {
	const dispatch=useAppDispatch()
	const handleDeleteColumn = async () => {
		try {
			await deleteSectionColumn(portfolioId, sectionId)
		} catch (error) {
			console.error('Error deleting column:', error);
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
