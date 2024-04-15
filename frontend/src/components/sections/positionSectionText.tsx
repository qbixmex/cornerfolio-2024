'use client';

import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import ButtonsPosition from '../buttonsPosition';

type Props = {
	portfolioId: string;
	section: SectionText;
};

const ChangePositionSectionText: React.FC<Props> = ({ portfolioId, section }) => {
	const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
		const formData = { position: newPosition };

		try {
			await updateSectionText(portfolioId, section.item.id, formData);
		} catch (error) {
			console.error('Error updating text:', error);
		}
	};

	return (
		<>
			<ButtonsPosition handleUpdate={handleUpdate} />
		</>
	);
};

export default ChangePositionSectionText;
