import { SectionImage } from '@/interfaces';
import { updateSectionImage } from '@/sections/actions/section.update.action';
import ButtonsPosition from '../buttonsPosition';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	section: SectionImage;
};

const ChangePositionSectionImage: React.FC<Props> = ({ portfolioId, section }) => {
	const dispatch = useAppDispatch();

	const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
		const formData = { position: newPosition };
		
		const data = await updateSectionImage(portfolioId, section.item.id, formData);
		
		if (data.error) {
			dispatch(setToast({ message: data.error, type: 'error' }));
		}

		if (data.message) {
			dispatch(setToast({
				message: "Image position saved successfully 👍",
				type: 'success'
			}));
		}
	};

	return (
		<>
			<ButtonsPosition handleUpdate={handleUpdate} />
		</>
	);
};

export default ChangePositionSectionImage;
