import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { SectionImageText } from '@/interfaces';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionImageText;
};

const ChangePositionSectionImageText: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const handleUpdate = async () => {
		const newPosition: 'img_text' | 'text_img' = section.item.position === 'img_text' ? 'text_img' : 'img_text';
		const formData = { position: newPosition };
		
		try {
			dispatch(setReloading(true)); // reloading true
			await updateSectionImageText(section.item.id, formData);
			
		} catch (error) {
			console.error('Error updating image-text:', error);
		} finally {
			  dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<div className=' flex justify-around w-full'>
			<button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={handleUpdate}>Swap</button>
		</div>
	);
};

export default ChangePositionSectionImageText;
