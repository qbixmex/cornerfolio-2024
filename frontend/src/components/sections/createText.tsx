import { createSectionText } from "@/sections/actions/section.action";

type Props = {
    portfolioId:string;
    order: number;
};
const CreateText:React.FC<Props> = ({portfolioId,order}) => {
    const handleCreateText= async () => {
        createSectionText(portfolioId,order)
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
