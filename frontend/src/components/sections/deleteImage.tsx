import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionImage } from '@/sections/actions/section.action';

type Props = {
	sectionId: string;
};

const DeleteImage: FC<Props> = ({ sectionId }) => {
	const handleDeleteImage = async () => {
		deleteSectionImage(sectionId)
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
