'use client';

import { updateSectionText } from '@/sections/actions/section.update.action';
import { SectionText } from '@/interfaces';

type Props = {
  section: SectionText;
};

const ChangePositionSectionText: React.FC<Props> = ({ section }) => {
  const handleUpdate = async (newPosition: 'left' | 'center' | 'right') => {
    const formData = { position: newPosition };
    await updateSectionText(section.item.id, formData);
  };

  return (
    <div className=' flex justify-around w-full'>
      <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('left')}>Left</button>
      <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('center')}>Center</button>
      <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={() => handleUpdate('right')}>Right</button>
    </div>
  );
};

export default ChangePositionSectionText;