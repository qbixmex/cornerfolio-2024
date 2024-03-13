import { FaTrash } from 'react-icons/fa';
import { deleteSectionText } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	sectionId: string;
};

const DeleteText: React.FC<Props> = ({ sectionId }) => {
	const dispatch=useAppDispatch()
	const handleDeleteText = async () => {
		deleteSectionText(sectionId)
		try {
			dispatch(setReloading(true)); // reloading true
			await deleteSectionText(sectionId)
		} catch (error) {
			console.error('Error deleting text:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
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
