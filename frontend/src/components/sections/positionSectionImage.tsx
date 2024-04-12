import { SectionImage } from '@/interfaces';
import { updateSectionImage } from '@/sections/actions/section.update.action';
import ButtonsPosition from '../buttonsPosition';

type Props = {
	portfolioId: string;
	section: SectionImage;
};

const ChangePositionSectionImage: React.FC<Props> = ({ portfolioId, section }) => {
	const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
		const formData = { position: newPosition };

		try {
			await updateSectionImage(portfolioId, section.item.id, formData);
		} catch (error) {
			console.error('Error updating image:', error);
		}
	};

	return (
		<>
			<ButtonsPosition handleUpdate={handleUpdate} />
		</>
	);
};

export default ChangePositionSectionImage;
