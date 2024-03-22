import { createSectionImage } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { FaRegImages } from 'react-icons/fa6';

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
			className="w-[70px] h-[90px] flex flex-col justify-between items-center p-[5px] m-4 bg-white hover:bg-gray-200 text-black text-sm rounded"
			onClick={handleCreateImage}
		>
			<FaRegImages size={40}/>
			<>Image</>
		</button>
	);
};

export default CreateImage;
