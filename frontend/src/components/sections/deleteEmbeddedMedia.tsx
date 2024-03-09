import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { deleteSectionEmbeddedMedia } from '@/sections/actions/section.action';

type Props = {
  sectionId: string;
};
const DeleteEmbeddedMedia: FC<Props> = ({ sectionId }) => {
  const handleDeleteEmbeddedMedia = async () => {
    deleteSectionEmbeddedMedia(sectionId)
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
