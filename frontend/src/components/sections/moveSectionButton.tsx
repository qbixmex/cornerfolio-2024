import { useAppDispatch } from '@/store';

import { moveSectionUpDown } from '@/portfolios/actions/portfolio.action';
import { setReloading } from '@/store/slices/reload.slice';
import { Button } from '@nextui-org/react';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';

type Props = {
	portfolioId: string;
	sectionId: string;
	isFirst: boolean;
	isLast: boolean;
};

const MoveSectionsUpDownButton: React.FC<Props & { isFirst: boolean; isLast: boolean }> = ({
	portfolioId,
	sectionId,
	isFirst,
	isLast,
}) => {
	const dispatch = useAppDispatch();

	const handleUpdate = async (action: 'up' | 'down') => {
		try {
			dispatch(setReloading(true)); // reloading true
			await moveSectionUpDown(portfolioId, sectionId, action);
		} catch (error) {
			console.error('Error updating text:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<div className="flex flex-col justify-around border mr-1 w-fit">
			{!isFirst && (
				<Button
					variant="faded"
					size="sm"
					fullWidth={true}
					type="button"
					className="h-15 w-15 text-xs  border-none bg-gradient-to-t from-black to-violet-900 hover:bg-gray-100"
					onClick={() => handleUpdate('up')}
				>
					<FaAnglesUp className="text-white text-lg" />
				</Button>
			)}
			{!isLast && (
				<Button
					color="default"
					variant="faded"
					size="sm"
					fullWidth={false}
					type="button"
					className="h-15 text-xs  border-none  bg-gradient-to-b from-black to-fuchsia-900"
					onClick={() => handleUpdate('down')}
				>
					<FaAnglesDown className="text-white text-lg" />
				</Button>
			)}
		</div>
	);
};

export default MoveSectionsUpDownButton;
