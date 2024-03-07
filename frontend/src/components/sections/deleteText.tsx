type Props = {
    sectionId:string;
};
const DeleteText:React.FC<Props> = ({sectionId}) => {
    const handleDeleteText = async () => {
        const response = await fetch(`http://localhost:4000/api/section-text/${sectionId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
            }
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
        } else {
            console.error('Failed to delete text');
        }
        
    };

    return (
        <button
            className="m-4 bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDeleteText}
        >Delete
        </button>
    );
};

export default DeleteText;
