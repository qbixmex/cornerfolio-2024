import { createSectionImageText } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	portfolioId: string;
	order: number;
};

const CreateImageText: React.FC<Props> = ({ portfolioId, order }) => {
	const dispatch = useAppDispatch()
	const handleCreateImageText = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionImageText(portfolioId, order)
		} catch (error) {
			console.error('Error creating image-text:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<button
			className="m-4 bg-gray-200 hover:bg-gray-300"
			onClick={handleCreateImageText}
		>
			Image & Text
		</button>
	);
};

export default CreateImageText;
