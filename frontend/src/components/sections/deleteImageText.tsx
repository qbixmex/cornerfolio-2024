import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionImageText } from '@/sections/actions/section.action';

type Props = {
    sectionId:string;
};

const DeleteImageText: FC<Props> = ({ sectionId }) => {

    const handleDeleteImageText = async () => {
        deleteSectionImageText(sectionId)
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
