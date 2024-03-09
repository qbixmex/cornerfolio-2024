import { createSectionDivider } from "@/sections/actions/section.action";

type Props = {
    portfolioId:string;
    order:number;
};
const CreateDivider:React.FC<Props> = ({portfolioId,order}) => {
    const handleCreateDivider = async () => {
        createSectionDivider(portfolioId,order)
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
