import { useState } from 'react';
import { SectionColumn } from '@/interfaces';
import { updateSectionColumn } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';

type Props = {
	position: 1 | 2 | 3;
	section: SectionColumn;
};

const formSchemaHeading = yup.object().shape({
	heading: yup
		.string()
		.min(1, 'Heading must be at least 1 character')
		.required('Heading is required !'),
});

const InputSectionColumnHeading: React.FC<Props> = ({ position, section }) => {

	const [heading] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.heading1;
			} else if (position === 2) {
				return section.item.heading2;
			} else {
				return section.item.heading3;
			}
		} else {
			return 'This is header';
		}
	});

	const [headingSize, setHeadingSize] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.headingSize1;
			} else if (position === 2) {
				return section.item.headingSize2;
			} else {
				return section.item.headingSize3;
			}
		} else {
			return 30; // default size
		}
	});

	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(headingSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};
	const formik = useFormik<{ heading: string }>({
		initialValues: {
			heading: heading
		},
		validationSchema: formSchemaHeading,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionColumn(position, section.item.id, {
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
				setToast({ message: 'Error updating column, check logs !', type: 'error' });
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
					className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green'
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
					${theme === 'modern' ? modern.headerFieldInput : ''} ${formik.touched.heading && formik.errors.heading ? 'border-2 border-red-500' : 'border-0'
						}`}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.heading && formik.touched.heading && (
					<p className="text-red-500 text-xs">{formik.errors.heading}</p>
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

export default InputSectionColumnHeading;
