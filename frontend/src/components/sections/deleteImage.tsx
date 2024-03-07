import { FaTrash } from 'react-icons/fa';

type Props = {
	sectionId: string;
};

const DeleteImage: React.FC<Props> = ({ sectionId }) => {
	const handleDeleteImage = async () => {
		const response = await fetch(`http://localhost:4000/api/section-image/${sectionId}`, {
			method: 'DELETE',
			headers: {
				"content-type": "application/json",
			}
		});

		if (response.ok) {
			const data = await response.json()
			console.log(data);
		} else {
			console.error('Failed to delete image');
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
