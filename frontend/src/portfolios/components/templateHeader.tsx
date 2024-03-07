'use client';

import { ChangeEvent, FC, useState } from 'react';

type Props = {
    header: {
        title: string;
        subHeading: string;
    };
};

export const TemplateHeader: FC<Props> = ({ header }) => {
    const [title, setTitle] = useState(header.title);
    const [subtitle, setSubtitle] = useState(header.subHeading);

    const handleTitlechange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubtitlechange = (e: ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value);
    };

    return (
        <div className="py-[30px] px-[80px] border-b-gray-300 border-2">
            <div className="gap-10 border-transparent border-2 w-full h-[150px] mt-[20px] p-[20px] hover:border-gray-300">
                <input
                    value={title}
                    onChange={handleTitlechange}
                    className="w-full outline-none text-5xl"
                    type="text"
                />
                <input
                    value={subtitle}
                    onChange={handleSubtitlechange}
                    className="w-full outline-none"
                    type="text"
                />
            </div>
        </div>
    );
};
