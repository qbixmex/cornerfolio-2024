import { createSectionColumn } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { PiTextColumns } from 'react-icons/pi';
import { Button } from '@nextui-org/react';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
};

const CreateColumn: React.FC<Props> = ({ portfolioId, order }) => {
	const dispatch = useAppDispatch()
	const handleCreateColumn = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionColumn(portfolioId, order)
		} catch (error) {
			console.error('Error creating column', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
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
