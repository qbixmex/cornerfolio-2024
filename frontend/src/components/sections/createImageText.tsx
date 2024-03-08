import { FC } from 'react';
import { createSectionImageText } from '@/sections/actions/section.action';

type Props = {
	portfolioId: string;
	order: number;
};

const CreateImageText: FC<Props> = ({ portfolioId, order }) => {
	const handleCreateImageText = async () => {
		createSectionImageText(portfolioId, order)
	};

	return (
		<button
			className="m-4 bg-gray-200 hover:bg-gray-300"
			onClick={handleCreateImageText}
		>
			Image & Text
		</button>
	);
};

export default CreateImageText;
