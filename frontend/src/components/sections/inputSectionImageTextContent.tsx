import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';

type Props = {
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtContent: yup
		.string()
		.min(1, 'txtContent must be at least 1 character')
		.required('txtContent is required !'),
});

const InputSectionImageTextContent: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.txtContentSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};

	const formik = useFormik<{ txtContent: string }>({
		initialValues: {
			txtContent: section.item.txtContent,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionImageText(section.item.id, {
					...formData,
					txtContentSize: fontSize,
				});
				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating image-text:', error);
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
					className={`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 bg-${ toast.type === 'error' ? 'red' : 'green' }-500 ${styles.slideLeft}`}
				>
					{toast.message}
				</div>
			)}

			<form
				className="flex items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<textarea
					id="txtContent"
					name="txtContent"
					value={formik.values.txtContent}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none bg-transparent
					${theme === 'modern' ? modern.textInputBackground : ''}
					${formik.touched.txtContent && formik.errors.txtContent ? 'border-2 border-red-500' : 'border-0'}`}
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.txtContent && formik.touched.txtContent && (
					<p className="text-red-500 text-xs">{formik.errors.txtContent}</p>
				)}

				<ButtonsSize
					decrementFontSize={decrementFontSize}
					incrementFontSize={incrementFontSize}
					formik={formik}
				/>
			</form>
		</div>
	);
};

export default InputSectionImageTextContent;
