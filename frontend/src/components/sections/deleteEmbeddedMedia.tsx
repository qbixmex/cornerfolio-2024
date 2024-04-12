import { FaTrash } from 'react-icons/fa';
import { deleteSectionEmbeddedMedia } from '@/sections/actions/section.action';

type Props = {
  portfolioId: string;
  sectionId: string;
};
const DeleteEmbeddedMedia: React.FC<Props> = ({ portfolioId, sectionId }) => {
  const handleDeleteEmbeddedMedia = async () => {
    try {
      await deleteSectionEmbeddedMedia(portfolioId, sectionId)
    } catch (error) {
      console.error('Error deleting embedded-media:', error);
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
