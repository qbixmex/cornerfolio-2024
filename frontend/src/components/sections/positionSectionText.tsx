'use client';

import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import ButtonsPosition from '../buttonsPosition';

type Props = {
	section: SectionText;
};

const ChangePositionSectionText: React.FC<Props> = ({ section }) => {
	const dispatch = useAppDispatch();
	const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
		const formData = { position: newPosition };

		try {
			dispatch(setReloading(true)); // reloading true
			await updateSectionText(section.item.id, formData);
		} catch (error) {
			console.error('Error updating text:', error);
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

export default ChangePositionSectionText;
