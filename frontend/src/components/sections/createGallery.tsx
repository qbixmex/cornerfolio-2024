import { createSectionGallery } from '@/sections/actions/section.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import { Button } from '@nextui-org/react';
import { BsFileImage } from 'react-icons/bs';
import { BsFileImageFill } from 'react-icons/bs';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolioId: string;
	order: number;
};
const CreateGallery: React.FC<Props> = ({ portfolioId, order }) => {
	const dispatch = useAppDispatch();
	const handleCreateGallery = async () => {
		try {
			dispatch(setReloading(true)); // reloading true
			await createSectionGallery(portfolioId, order);
		} catch (error) {
			console.error('Error creating gallery:', error);
		} finally {
			dispatch(setReloading(false)); // reloading false
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				color="primary"
				variant="shadow"
				size="md"
				fullWidth={true}
				className={`w-fit border-none bg-gradient-to-tr from-blue-900 to-cyan-600 m-4 bg-gray-200 hover:bg-gray-300 ${modern.addSectionButtonsBackground}`}
				onClick={handleCreateGallery}
				type="button"
			>
				<BsFileImage className="text-lg text-white" />
				<BsFileImageFill className="text-lg text-white" />
			</Button>
			<span className="text-sm">Gallery</span>
		</div>
	);
};

export default CreateGallery;
