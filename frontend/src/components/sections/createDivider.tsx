import { createSectionDivider } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { RxDividerHorizontal } from 'react-icons/rx';

type Props = {
	portfolioId: string;
	order: number;
};

const CreateDivider: React.FC<Props> = ({ portfolioId, order }) => {
	const dispatch = useAppDispatch()
	const handleCreateDivider = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionDivider(portfolioId, order);
		} catch (error) {
			console.error('Error creating divider:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<button
			className="w-[70px] h-[90px] flex flex-col justify-between items-center p-[5px] m-4 bg-white hover:bg-gray-200 text-black text-sm rounded"
			onClick={handleCreateDivider}
		>
			<RxDividerHorizontal size={40}/>
			<>Divider</>
		</button>
	);
};

export default CreateDivider;
