import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionDivider } from '@/sections/actions/section.action';

type Props = {
	sectionId: string;
};

const DeleteDivider: FC<Props> = ({ sectionId }) => {

	const handleDeleteDivider = async () => {
		deleteSectionDivider(sectionId)
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
