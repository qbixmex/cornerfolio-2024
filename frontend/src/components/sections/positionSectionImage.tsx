import { SectionImage } from '@/interfaces';
import { updateSectionImage } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import ButtonsPosition from '../buttonsPosition';

type Props = {
	section: SectionImage;
};

const ChangePositionSectionImage: React.FC<Props> = ({ section }) => {
	const dispatch = useAppDispatch();
	const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
		const formData = { position: newPosition };

		try {
			dispatch(setReloading(true)); // reloading true
			await updateSectionImage(section.item.id, formData);
		} catch (error) {
			console.error('Error updating image:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<>
			<ButtonsPosition handleUpdate={handleUpdate} />
		</>
	);
};

export default ChangePositionSectionImage;
