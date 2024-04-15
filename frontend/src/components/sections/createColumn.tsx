import { createSectionColumn } from '@/sections/actions/section.action';
import { PiTextColumns } from 'react-icons/pi';
import { Button } from '@nextui-org/react';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateColumn: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const handleCreateColumn = async () => {
		try {
			await createSectionColumn(portfolioId, order);
			onCloseModal();
		} catch (error) {
			console.error('Error creating column', error);
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
				onClick={handleCreateColumn}
				type="button"
			>
				<PiTextColumns className="text-lg text-white" />
			</Button>
			<span className="text-sm">Column</span>
		</div>
	);
};

export default CreateColumn;
