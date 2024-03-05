"use client";

import { ChangeEvent, useEffect, useState } from "react";

const TemplateFooter = () => {
    const [message, setMessage] = useState("");
    // const [email, setSubtitle] = useState("");

    const handleTitlechange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
        localStorage.setItem("message", message);
    };

    // const handleSubtitlechange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setSubtitle(e.target.value);
    //     localStorage.setItem("subtitle", subtitle);
    // };

    useEffect(() => {
        const savedMessage = localStorage.getItem("message");
        // const savedSubtitle = localStorage.getItem("subtitle");
        if (savedMessage) {
            setMessage(savedMessage);
        } else {
            setMessage("Contact me");
        }
        // if (savedSubtitle) {
        //     setTitle(savedSubtitle);
        // } else {
        //     setSubtitle("- Currently student at Cornerstone in Vancouver");
        // }
    }, []);

    return (
        <div className="py-[30px] px-[80px]">
            <div className="gap-10 border-transparent border-2 w-full p-[8px] hover:border-gray-300">
                <input
                    value={message}
                    onChange={handleTitlechange}
                    className="w-full outline-none text-lg"
                    type="text"
                />
            </div>
            {/* <input
                    value={subtitle}
                    onChange={handleSubtitlechange}
                    className="w-full outline-none"
                    type="text"
                /> */}
            <h4>email</h4>
            <div className="flex gap-4 mt-4">
                <p>Home</p>
                <p>About</p>
            </div>
        </div>
    );
};

export default TemplateFooter;
