import { FaTrash } from 'react-icons/fa';
import { deleteSectionDivider } from '@/sections/actions/section.action';

type Props = {
	portfolioId: string;
	sectionId: string;
};

const DeleteDivider: React.FC<Props> = ({ portfolioId, sectionId }) => {
	const handleDeleteDivider = async () => {
		try {
			await deleteSectionDivider(portfolioId, sectionId)
		} catch (error) {
			console.error('Error deleting text:', error);
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
