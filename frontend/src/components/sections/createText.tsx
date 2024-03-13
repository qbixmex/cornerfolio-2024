import { createSectionText } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

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
			className="m-4 bg-gray-200 hover:bg-gray-300"
			onClick={handleCreateText}
		>Text</button>
	);
};

export default CreateText;
