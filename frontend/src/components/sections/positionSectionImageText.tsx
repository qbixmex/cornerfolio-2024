import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import { Button } from '@nextui-org/react';
import { HiSwitchHorizontal } from 'react-icons/hi';

type Props = {
	section: SectionImageText;
};

const ChangePositionSectionImageText: React.FC<Props> = ({ section }) => {
	const dispatch = useAppDispatch();
	const handleUpdate = async () => {
		const newPosition: 'img_text' | 'text_img' =
			section.item.position === 'img_text' ? 'text_img' : 'img_text';
		const formData = { position: newPosition };

		try {
			dispatch(setReloading(true)); // reloading true
			await updateSectionImageText(section.item.id, formData);
		} catch (error) {
			console.error('Error updating image-text:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<div className=" flex justify-around w-full">
			<Button
				color="primary"
				variant="faded"
				size="sm"
				isIconOnly
				fullWidth={true}
				className=" border-none bg-gradient-to-tr from-black via-maroon-900 to-lime-400 mb-5"
				onClick={handleUpdate}
			>
				<HiSwitchHorizontal className="text-white text-medium" />
			</Button>
		</div>
	);
};

export default ChangePositionSectionImageText;
