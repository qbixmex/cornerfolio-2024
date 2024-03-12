import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionImage } from '@/sections/actions/section.action';
import { setReloading } from "@/store/slices/reload.slice";
import { useAppDispatch } from '@/store';

type Props = {
	sectionId: string;
};

const DeleteImage: FC<Props> = ({ sectionId }) => {
	const dispatch=useAppDispatch()
	const handleDeleteImage = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await deleteSectionImage(sectionId)
		} catch (error) {
			console.error('Error deleting image:', error);
		} finally {
			  dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<button
			className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
			onClick={handleDeleteImage}
		>
			<FaTrash />
		</button>
	);
};

export default DeleteImage;
