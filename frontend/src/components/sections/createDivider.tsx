import { createSectionDivider } from '@/sections/actions/section.action';
import { Button } from '@nextui-org/react';
import { LuAlignVerticalSpaceAround } from 'react-icons/lu';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
	onCloseModal: () => void;
};

const CreateDivider: React.FC<Props> = ({ portfolioId, order, onCloseModal }) => {
	const handleCreateDivider = async () => {
		try {
			await createSectionDivider(portfolioId, order);
			onCloseModal();
		} catch (error) {
			console.error('Error creating divider:', error);
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
				onClick={handleCreateDivider}
				type="button"
			>
				<LuAlignVerticalSpaceAround className="text-lg text-white" />
			</Button>
			<span className="text-sm">Divider-Line</span>
		</div>
	);
};

export default CreateDivider;
