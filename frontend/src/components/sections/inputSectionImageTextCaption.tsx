import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { Button } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	imgCaption: yup
		.string()
		.min(1, 'imgCaption must be at least 1 character')
		.required('imgCaption is required !'),
});

const InputSectionImageTextCaption: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();

	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.imgCaptionSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};
	const formik = useFormik<{ imgCaption: string }>({
		initialValues: {
			imgCaption: section.item.imgCaption,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionImageText(section.item.id, {
					...formData,
					imgCaptionSize: fontSize,
				});
				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
			} catch (error) {
				console.log(error);
				setToast({ message: `Error updating divider, check logs !`, type: 'error' });
			} finally {
				dispatch(setReloading(false)); // reloading false
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			}
		},
	});

	const [toast, setToast] = useState({
		message: '',
		type: '',
	});

	return (
		<div>
			{toast.message && (
				<div
					className={`fixed z-[100] top-5 right-5 w-fit bg-${
						toast.type === 'error' ? 'red' : 'green'
					}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}
				>
					{toast.message}
				</div>
			)}
			<form className="flex justify-center items-center m-4" onSubmit={formik.handleSubmit}>
				<input
					id="imgCaption"
					name="imgCaption"
					value={formik.values.imgCaption}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none bg-transparent
					${theme === 'modern' ? modern.imageInputBackground : ''}
					${formik.touched.imgCaption && formik.errors.imgCaption ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>

				{formik.errors.imgCaption && formik.touched.imgCaption && (
					<p className="text-red-500 text-xs">{formik.errors.imgCaption}</p>
				)}

				<div className="text-sm flex gap-1 ">
					<Button
						color="primary"
						variant="faded"
						size="sm"
						isIconOnly
						fullWidth={true}
						className="border bg-gradient-to-tr from-blue-900 to-cyan-600 "
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
						className=" border bg-gradient-to-tl from-pink-500 to-orange-400"
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
						className={`
						border bg-gradient-to-tl from-purple-700 to-sky-500
					${
						formik.errors.imgCaption ? 'hidden' : ''
					} hover:bg-gray-200 flex text-xs justify-center self-center rounded-md border h-8 w-9`}
					>
						<span className="text-white">save</span>
					</Button>
				</div>
			</form>
		</div>
	);
};

export default InputSectionImageTextCaption;
