import { createSectionImage } from "@/sections/actions/section.action";

type Props = {
    portfolioId:string;
    order:number;
};
const CreateImage:React.FC<Props> = ({portfolioId,order}) => {
    const handleCreateImage= async () => {
        createSectionImage(portfolioId,order)
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
