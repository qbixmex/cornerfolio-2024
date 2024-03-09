import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionText } from '@/sections/actions/section.action';

type Props = {
	sectionId: string;
};

const DeleteText: FC<Props> = ({ sectionId }) => {
	const handleDeleteText = async () => {
		deleteSectionText(sectionId)
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
