"use client";

import { ChangeEvent, useEffect, useState } from "react";

const TemplateHeader = () => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    const handleTitlechange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        localStorage.setItem("title", title);
    };

    const handleSubtitlechange = (e: ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value);
        localStorage.setItem("subtitle", subtitle);
    };

    useEffect(() => {
        const savedTitle = localStorage.getItem("title");
        const savedSubtitle = localStorage.getItem("subtitle");
        if (savedTitle) {
            setTitle(savedTitle);
        } else {
            setTitle("Hi, I'm Taiki, software engineer.");
        }
        if (savedSubtitle) {
            setTitle(savedSubtitle);
        } else {
            setSubtitle("- Currently student at Cornerstone in Vancouver");
        }
    }, []);

    return (
        <div className="py-[30px] px-[80px] border-b-gray-300 border-2">
            <div className="flex justify-between">
                <p>name</p>
                <div className="flex gap-3">
                    <p>Home</p>
                    <p>About</p>
                </div>
            </div>
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

export default TemplateHeader;
