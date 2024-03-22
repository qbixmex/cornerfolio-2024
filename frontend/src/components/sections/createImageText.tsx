import { createSectionImageText } from '@/sections/actions/section.action';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { FaRegFileImage } from 'react-icons/fa6';
import { CiTextAlignRight } from 'react-icons/ci';

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
			className="w-[70px] h-[90px] flex flex-col justify-between items-center p-[5px] m-4 bg-white hover:bg-gray-200 text-black text-sm rounded"
			onClick={handleCreateImageText}
		>
			<div className='flex justify-between'>
				<FaRegFileImage size={30}/>
				<CiTextAlignRight size={30}/>
			</div>
			Image & Text
		</button>
	);
};

export default CreateImageText;
