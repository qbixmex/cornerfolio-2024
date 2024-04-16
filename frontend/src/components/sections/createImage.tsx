import { createSectionImage } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { FaImage } from 'react-icons/fa';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};
const CreateImage: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const handleCreateImage = async () => {
		try {
			await createSectionImage(portfolioId, order);
			onCloseModal();
		} catch (error) {
			console.error('Error creating image:', error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				color="primary"
				variant="shadow"
				size="sm"
				fullWidth={true}
				className={`w-fit border-none bg-gradient-to-tr from-blue-900 to-cyan-600 m-4 bg-gray-200 hover:bg-gray-300 ${modern.addSectionButtonsBackground}`}
				onClick={handleCreateImage}
				type="button"
			>
				<FaImage className="text-lg text-white" />
			</Button>
			<span className="text-sm">Image</span>
		</div>
	);
};

export default CreateImage;
