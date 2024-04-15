import { createSectionText } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { BiText } from 'react-icons/bi';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateText: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const handleCreateText = async () => {
		try {
			await createSectionText(portfolioId, order);
			onCloseModal();
		} catch (error) {
			console.error('Error creating text', error);
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
				onClick={handleCreateText}
				type="button"
			>
				<BiText className="text-lg text-white" />
			</Button>
			<span className="text-sm">Text</span>
		</div>
	);
};

export default CreateText;
