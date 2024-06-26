import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { FiMinus, FiPlus } from 'react-icons/fi';

type Props = {
	decrementFontSize: () => void;
	incrementFontSize: () => void;
	formik: any;
};

const ButtonsSize: React.FC<Props> = ({ decrementFontSize, incrementFontSize, formik }) => {
	return (
		<div className="flex justify-center items-center gap-1 mr-2">
			<Button
				color="primary"
				variant="faded"
				size="sm"
				isIconOnly
				fullWidth={true}
				className="border-none bg-gradient-to-tr from-blue-900 to-cyan-600 "
				type="button"
				onClick={incrementFontSize}
			>
				<FiPlus className="text-white" />
			</Button>

			<Button
				color="primary"
				variant="faded"
				size="sm"
				isIconOnly
				fullWidth={true}
				className=" border-none bg-gradient-to-tl from-pink-500 to-orange-400"
				type="button"
				onClick={decrementFontSize}
			>
				<FiMinus className="text-white" />
			</Button>
			<Button
				type="submit"
				color="primary"
				variant="shadow"
				size="sm"
				className={clsx(
					"border-none bg-gradient-to-tl from-purple-700 to-sky-500 hover:bg-gray-200 flex text-xs justify-center self-center rounded-md border h-8 w-9",
					{ "hidden": formik.errors.content }
				)}
			>
				<span className="text-white">Save</span>
			</Button>
		</div>
	);
};

export default ButtonsSize;
