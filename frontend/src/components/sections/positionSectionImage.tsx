import { updateSectionImage } from '@/sections/actions/section.update.action';
import { SectionImage } from '@/interfaces';

type Props = {
  section: SectionImage;
};

const ChangePositionSectionImage: React.FC<Props> = ({ section }) => {
  const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
    const formData = { position: newPosition };
    await updateSectionImage(section.item.id, formData);
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