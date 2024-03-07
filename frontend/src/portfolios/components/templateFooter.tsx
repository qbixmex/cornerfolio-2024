'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

type Props = {
    footer: {
        links: string[];
        text: string;
    };
};

export const TemplateFooter: FC<Props> = ({ footer }) => {
    const [links, setLinks] = useState<string[]>(footer.links);
    const [text, setText] = useState(footer.text);
    return (
        <div className="py-[30px] px-[80px]">
            <div className="gap-10 border-transparent border-2 w-full p-[8px] hover:border-gray-300">
                {links.map((link) => {
                    return (
                        <Link
                            key={link}
                            href="#"
                            className="w-full outline-none text-base"
                        >
                            {link}
                        </Link>
                    );
                })}
            </div>
            <h4>{text}</h4>
        </div>
    );
};
