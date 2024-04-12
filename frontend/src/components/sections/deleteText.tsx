import { FaTrash } from 'react-icons/fa';
import { deleteSectionText } from '@/sections/actions/section.action';

type Props = {
	portfolioId: string;
	sectionId: string;
};

const DeleteText: React.FC<Props> = ({ portfolioId, sectionId }) => {
	const handleDeleteText = async () => {
		try {
			await deleteSectionText(portfolioId, sectionId);
		} catch (error) {
			console.error('Error deleting text:', error);
		}
	};

	return (
		<button
			className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
			onClick={handleDeleteText}
		>
			<FaTrash />
		</button>
	);
};

export default DeleteText;
