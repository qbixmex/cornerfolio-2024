import { FaTrash } from 'react-icons/fa';
import { deleteSectionGallery } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	sectionId: string;
};

const DeleteGallery: React.FC<Props> = ({ sectionId }) => {
	const dispatch = useAppDispatch()
	const handleDeleteGallery = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await deleteSectionGallery(sectionId)
		} catch (error) {
			console.error('Error deleting gallery:', error);
		} finally {
			  dispatch(setReloading(false)); // reloading false
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
