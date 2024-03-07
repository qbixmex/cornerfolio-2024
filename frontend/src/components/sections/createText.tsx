type Props = {
    portfolioId:string;
};
const CreateText:React.FC<Props> = ({portfolioId}) => {
    const handleCreateText= async () => {
        
        const response = await fetch(`http://localhost:4000/api/section-text/${portfolioId}`, {
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
            console.error('Failed to create text');
        }
        
    };

    return (
        <button
            className="m-4 bg-gray-200 hover:bg-gray-300"
            onClick={handleCreateText}
        >
            Text
        </button>
    );
};

export default CreateText;
