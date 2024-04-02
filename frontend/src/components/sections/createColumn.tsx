import { createSectionColumn } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { PiTextColumns } from 'react-icons/pi';

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
		<button
			className="w-[70px] h-[90px] flex flex-col justify-between items-center p-[5px] m-4 bg-white hover:bg-gray-200 text-black text-sm rounded"
			onClick={handleCreateColumn}
		>
		<PiTextColumns size={40}/>
		<>Column</>
		</button>
	);
};

export default CreateColumn;
