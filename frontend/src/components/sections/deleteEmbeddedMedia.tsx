import { FaTrash } from 'react-icons/fa';
import { deleteSectionEmbeddedMedia } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
  sectionId: string;
};
const DeleteEmbeddedMedia: React.FC<Props> = ({ sectionId }) => {
  const dispatch=useAppDispatch()
  const handleDeleteEmbeddedMedia = async () => {
    try {
      dispatch(setReloading(true)); // reloading true
      await deleteSectionEmbeddedMedia(sectionId)
    } catch (error) {
        console.error('Error deleting embedded-media:', error);
    } finally {
        dispatch(setReloading(false)); // reloading false
    }
  };

  return (
    <button
      className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
      onClick={handleDeleteEmbeddedMedia}
    >
      <FaTrash />
    </button>
  );
};

export default DeleteEmbeddedMedia;
