import { createSectionText } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { CiTextAlignCenter } from 'react-icons/ci';

type Props = {
	portfolioId: string;
	order: number;
};

const CreateText: React.FC<Props> = ({ portfolioId, order }) => {
	const dispatch = useAppDispatch()
	const handleCreateText = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionText(portfolioId, order)
		} catch (error) {
			console.error('Error creating text', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<button
			className="w-[70px] h-[90px] flex flex-col justify-between items-center p-[5px] m-4 bg-white hover:bg-gray-200 text-black text-sm rounded"
			onClick={handleCreateText}
		>
		<CiTextAlignCenter size={40}/>
		<>Text</>
		</button>
	);
};

export default CreateText;
