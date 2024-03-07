type Props = {
    sectionId:string;
};
const DeleteImageText:React.FC<Props> = ({sectionId}) => {
    const handleDeleteImageText = async () => {
        const response = await fetch(`http://localhost:4000/api/section-image-text/${sectionId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
            }
        });

        if (response.ok) {
            const data=await response.json()
            console.log(data);
        } else {
            console.error('Failed to delete image-text');
        }
        
    };

    return (
        <button
            className="m-4 bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDeleteImageText}
        >Delete
        </button>
    );
};

export default DeleteImageText;
