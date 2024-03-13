import { createSectionDivider } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

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
			className="m-4 bg-gray-200 hover:bg-gray-300"
			onClick={handleCreateDivider}
		>
			Divider
		</button>
	);
};

export default CreateDivider;
