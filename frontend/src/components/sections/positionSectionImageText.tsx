import React from 'react';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { SectionImageText } from '@/interfaces';

type Props = {
    section: SectionImageText;
};

const ChangePostionSectionImageText: React.FC<Props> = ({section}) => {
    const handleUpdate =async () => {
        const newPosition:'img_text'|'text_img'= section.item.position === 'img_text' ? 'text_img' : 'img_text';
        const formData = { position: newPosition };
        const data = await updateSectionImageText(section.item.id,formData);
        console.log(data)
    };

    return (
        <div className=' flex justify-around w-full'>
            <button className='h-15 w-15 text-xs border hover:bg-gray-100' onClick={handleUpdate}>Swap</button>
        </div>
    );
};

export default ChangePostionSectionImageText;
