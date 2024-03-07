import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
	sectionId: string;
};

const DeleteDivider: FC<Props> = ({ sectionId }) => {

	const handleDeleteDivider = async () => {
		const response = await fetch(`http://localhost:4000/api/section-divider/${sectionId}`, {
			method: 'DELETE',
			headers: {
				"content-type": "application/json",
			}
		});

		if (response.ok) {
			const data = await response.json()
			console.log(data);
		} else {
			console.error('Failed to delete divider');
		}

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
