import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
  sectionId: string;
};
const DeleteEmbeddedMedia: FC<Props> = ({ sectionId }) => {
  const handleDeleteEmbeddedMedia = async () => {
    const response = await fetch(`http://localhost:4000/api/section-embedded-media/${sectionId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
      }
    });

    if (response.ok) {
      const data = await response.json()
      console.log(data);
    } else {
      console.error('Failed to delete embedded media');
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
