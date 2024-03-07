type Props = {
    portfolioId:string;
};
const CreateDivider:React.FC<Props> = ({portfolioId}) => {
    const handleCreateDivider = async () => {
        
        const response = await fetch(`http://localhost:4000/api/section-divider/${portfolioId}`, {
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
            console.error('Failed to create divider');
        }
        
    };

    return (
        <button
            className="m-4 bg-gray-200 hover:bg-gray-300"
            onClick={handleCreateDivider}
        >
            Divider
        </button>
    );
};

export default CreateDivider;
