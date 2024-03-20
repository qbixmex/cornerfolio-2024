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

type Props = {
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtHeading: yup
		.string()
		.min(1, 'txtHeading must be at least 1 character')
		.required('txtHeading is required !'),
});

const InputSectionImageTextHeading: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.txtHeadingSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};

	const formik = useFormik<{ txtHeading: string }>({
		initialValues: {
			txtHeading: section.item.txtHeading,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true
				const data = await updateSectionImageText(section.item.id, {
					...formData,
					txtHeadingSize: fontSize,
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
				<input
					id="txtHeading"
					name="txtHeading"
					value={formik.values.txtHeading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none 
					${theme === 'modern' ? modern.headerFieldInput : ''}
					${formik.touched.txtHeading && formik.errors.txtHeading ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.txtHeading && formik.touched.txtHeading && (
					<p className="text-red-500 text-xs">{formik.errors.txtHeading}</p>
				)}

				<div className="text-sm">
					<button type="button" onClick={incrementFontSize}>
						+
					</button>
					<button type="button" onClick={decrementFontSize}>
						-
					</button>
				</div>

				<button
					type="submit"
					className={`${
						formik.errors.txtHeading ? 'hidden' : ''
					} hover:bg-gray-200 flex text-xs justify-center slef-center rounded-md border h-8 w-9`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionImageTextHeading;
