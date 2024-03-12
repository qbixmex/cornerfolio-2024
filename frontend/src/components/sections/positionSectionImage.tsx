import { updateSectionImage } from '@/sections/actions/section.update.action';
import { SectionImage } from '@/interfaces';
import { setReloading } from "@/store/slices/reload.slice";
import { useAppDispatch } from '@/store';

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
    <div className='flex justify-around w-full'>
      <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('left')}>Left</button>
      <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('center')}>Center</button>
      <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('right')}>Right</button>
    </div>
  );
};

export default ChangePositionSectionImage;