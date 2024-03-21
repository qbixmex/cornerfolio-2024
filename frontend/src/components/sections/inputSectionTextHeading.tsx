import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';

type Props = {
	section: SectionText;
};

const formSchemaHeading = yup.object().shape({
	heading: yup
		.string()
		.min(1, 'Heading must be at least 1 character')
		.required('Heading is required !'),
});

const InputSectionTextHeading: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.headingSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};
	const formik = useFormik<{ heading: string }>({
		initialValues: {
			heading: section.item.heading,
		},
		validationSchema: formSchemaHeading,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionText(section.item.id, {
					...formData,
					headingSize: fontSize,
				});

				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
			} catch (error) {
				console.error(error);
				setToast({ message: 'Error updating text, check logs !', type: 'error' });
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
			<form
				className="flex items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<input
					id="heading"
					name="heading"
					value={formik.values.heading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none bg-transparent
					${theme === 'modern' ? modern.headerFieldInput : ''} ${
						formik.touched.heading && formik.errors.heading ? 'border-2 border-red-500' : 'border-0'
					}`}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.heading && formik.touched.heading && (
					<p className="text-red-500 text-xs">{formik.errors.heading}</p>
				)}
				<div className="text-sm flex gap-1 mr-2">
					<button
						className="border w-[30px] h-[30px] rounded hover:bg-gray-200 transition-colors"
						type="button"
						onClick={incrementFontSize}
					>
						+
					</button>
					<button
						className="border w-[30px] h-[30px] rounded hover:bg-gray-200 transition-colors"
						type="button"
						onClick={decrementFontSize}
					>
						-
					</button>
				</div>

				<button
					type="submit"
					className={clsx(
						`hover:bg-gray-200 flex text-xs justify-center self-center rounded-md border h-8 w-9`,
						{ 'hidden': formik.errors.heading }
					)}
				>save</button>
			</form>
		</div>
	);
};

export default InputSectionTextHeading;
