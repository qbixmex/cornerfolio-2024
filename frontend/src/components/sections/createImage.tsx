type Props = {
    portfolioId:string;
};
const CreateImage:React.FC<Props> = ({portfolioId}) => {
    const handleCreateImage= async () => {
        
        const response = await fetch(`http://localhost:4000/api/section-image/${portfolioId}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({})
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
        } else {
            console.error('Failed to create image');
        }
        
    };

    return (
        <button
            className="m-4 bg-gray-200 hover:bg-gray-300"
            onClick={handleCreateImage}
        >
            Image
        </button>
    );
};

export default CreateImage;
