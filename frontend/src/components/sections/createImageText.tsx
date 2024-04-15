import { createSectionImageText } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { GrTextWrap } from 'react-icons/gr';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateImageText: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const handleCreateImageText = async () => {
		try {
			await createSectionImageText(portfolioId, order);
			onCloseModal();
		} catch (error) {
			console.error('Error creating image-text:', error);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				color="primary"
				variant="shadow"
				size="md"
				fullWidth={true}
				className={`w-fit border-none bg-gradient-to-tr from-blue-900 to-cyan-600 m-4 bg-gray-200 hover:bg-gray-300 ${modern.addSectionButtonsBackground}`}
				onClick={handleCreateImageText}
				type="button"
			>
				<GrTextWrap className="text-lg text-white" />
			</Button>
			<span className="text-sm mb-2.5">Image-Text</span>
		</div>
	);
};

export default CreateImageText;
