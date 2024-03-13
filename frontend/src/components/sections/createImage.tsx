import { createSectionImage } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	portfolioId: string;
	order: number;
};
const CreateImage: React.FC<Props> = ({ portfolioId, order }) => {
	const dispatch = useAppDispatch()
	const handleCreateImage = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionImage(portfolioId, order)
		} catch (error) {
			console.error('Error creating image:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<button
			className="m-4 bg-gray-200 hover:bg-gray-300"
			onClick={handleCreateImage}
		>Image</button>
	);
};

export default CreateImage;
