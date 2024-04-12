import { FaTrash } from 'react-icons/fa';
import { deleteSectionImageText } from '@/sections/actions/section.action';

type Props = {
	portfolioId: string;
	sectionId: string;
};

const DeleteImageText: React.FC<Props> = ({ portfolioId, sectionId }) => {
	const handleDeleteImageText = async () => {
		try {
			await deleteSectionImageText(portfolioId, sectionId)
		} catch (error) {
			console.error('Error deleting image-text:', error);
		}
	};

	return (
		<button
			className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
			onClick={handleDeleteImageText}
		>
			<FaTrash />
		</button>
	);
};

export default DeleteImageText;
