"use client"
import { useState } from "react";
type Props = {
    portfolioId:string;
};
const CreateEmbeddedMedia:React.FC<Props> = ({portfolioId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [code,setCode] =useState(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleCodeChange = (event:any) => {
        setCode(event.target.value);
    };

    const handleCreateEmbeddedMedia= async () => {
        if (!code || code==="") {
            alert('Please enter some code.');
            return;
        }

        const response = await fetch(`http://localhost:4000/api/section-embedded-media/${portfolioId}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({code:code})
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
        } else {
            console.error('Failed to create embedded media');
        }
        
    };

    return (
        <>
            {/*  Open Modal */}
            <button type="button" onClick={openModal} className='m-4 bg-gray-200 hover:bg-gray-300'>
                Video
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-100 transition-transform duration-300">
                    {/* Modal content */}
                    <div className="bg-white w-1/2 h-1/2 p-12">
                        {/* Close modal button */}
                        <button className="focus:outline-none" type="button" onClick={closeModal}>
                            {/* Hero icon - close button */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Modal content */}
                        <div>
                            <h2 className='text-xl'>Add Link</h2>
                            <textarea onChange={handleCodeChange} className="border w-full text-sm">{code}</textarea>
                            <button 
                                className="m-4 bg-gray-200 hover:bg-gray-300"
                                onClick={handleCreateEmbeddedMedia}>
                                    Insert Video
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateEmbeddedMedia;
