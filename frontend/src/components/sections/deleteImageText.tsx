import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionImageText } from '@/sections/actions/section.action';
import { setReloading } from "@/store/slices/reload.slice";
import { useAppDispatch } from '@/store';

type Props = {
    sectionId:string;
};

const DeleteImageText: FC<Props> = ({ sectionId }) => {
    const dispatch=useAppDispatch()
    const handleDeleteImageText = async () => {
        try {
			dispatch(setReloading(true)); // reloading true
			await deleteSectionImageText(sectionId)
		} catch (error) {
			console.error('Error deleting image-text:', error);
		} finally {
			  dispatch(setReloading(false)); // reloading false
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
