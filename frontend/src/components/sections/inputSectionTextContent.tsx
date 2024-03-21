import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
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
	section: SectionText;
};

const formSchemaContent = yup.object().shape({
	content: yup
		.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
});

const InputSectionTextContent: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.contentSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};
	const formik = useFormik<{ content: string }>({
		initialValues: {
			content: section.item.content,
		},
		validationSchema: formSchemaContent,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionText(section.item.id, {
					...formData,
					contentSize: fontSize,
				});

				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating text:', error);
			} finally {
				dispatch(setReloading(false)); // reloading false
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
			<form
				className="flex items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<textarea
					id="content"
					name="content"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none bg-transparent
					${theme === 'modern' ? modern.textInputBackground : ''} ${
						formik.touched.content && formik.errors.content ? 'border-2 border-red-500' : 'border-0'
					}`}
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.content && formik.touched.content && (
					<p className="text-red-500 text-xs">{formik.errors.content}</p>
				)}

				<div className="flex flex-col justify-center items-center gap-1 mr-2">
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
						formik.errors.content ? 'hidden' : ''
					} hover:bg-gray-200 flex text-xs justify-center self-center rounded-md border h-8 w-9`}
					>
						<span className="text-white">save</span>
					</Button>
				</div>
			</form>
		</div>
	);
};
export default InputSectionTextContent;
