import { Button } from '@nextui-org/react';
import { PiArrowFatLineLeftFill, PiArrowFatLineRightFill } from 'react-icons/pi';
import { TbFocusCentered } from 'react-icons/tb';

type Props = {
	handleUpdate: (newPosition: 'left' | 'center' | 'right') => void;
};

const ButtonsPosition: React.FC<Props> = ({ handleUpdate }) => {
	return (
		<div className="flex justify-around w-full">
			<Button
				type="button"
				color="primary"
				variant="shadow"
				isIconOnly
				size="sm"
				className={`border-none bg-gradient-to-tl from-purple-700 to-sky-500 hover:bg-gray-200 flex justify-center self-center rounded-md h-8 w-9 mb-3`}
				onClick={() => handleUpdate('left')}
			>
				<PiArrowFatLineLeftFill className="text-white text-medium" />
			</Button>

			<Button
				type="button"
				color="primary"
				variant="shadow"
				isIconOnly
				size="sm"
				className={`border-none bg-gradient-to-tl from-purple-300 to-sky-500 hover:bg-gray-200 flex justify-center self-center rounded-md h-8 w-9 mb-3`}
				onClick={() => handleUpdate('center')}
			>
				<TbFocusCentered className="text-white text-medium" />
			</Button>

			<Button
				type="button"
				color="primary"
				variant="shadow"
				isIconOnly
				size="sm"
				className={`border-none bg-gradient-to-tl from-purple-700 to-sky-500 hover:bg-gray-200 flex justify-center self-center rounded-md h-8 w-9 mb-3`}
				onClick={() => handleUpdate('right')}
			>
				<PiArrowFatLineRightFill className="text-white text-medium" />
			</Button>
		</div>
	);
};

export default ButtonsPosition;
