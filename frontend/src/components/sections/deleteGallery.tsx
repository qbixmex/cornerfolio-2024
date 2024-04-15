import { FaTrash } from 'react-icons/fa';
import { deleteSectionGallery } from '@/sections/actions/section.action';

type Props = {
	portfolioId: string;
	sectionId: string;
};

const DeleteGallery: React.FC<Props> = ({ portfolioId, sectionId }) => {
	const handleDeleteGallery = async () => {
		try {
			await deleteSectionGallery(portfolioId, sectionId)
		} catch (error) {
			console.error('Error deleting gallery:', error);
		}
	};

	return (
		<button
			className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
			onClick={handleDeleteGallery}
		>
			<FaTrash />
		</button>
	);
};

export default DeleteGallery;
