import { useState } from 'react';
import { SectionGallery } from '@/interfaces';
import { updateSectionGallery } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import * as yup from 'yup';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';

type Props = {
	position: 1 | 2 | 3;
	section: SectionGallery;
};

const formSchema = yup.object().shape({
	caption: yup
		.string()
		.min(1, 'Caption must be at least 1 character')
		.required('Caption is required !'),
});

const InputSectionGallery: React.FC<Props> = ({ position, section }) => {
	const [caption, setCaption] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.caption1;
			} else if (position === 2) {
				return section.item.caption2;
			} else {
				return section.item.caption3;
			}
		} else {
			return 'This is caption';
		}
	});

	const [captionSize, setCaptionSize] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.captionSize1;
			} else if (position === 2) {
				return section.item.captionSize2;
			} else {
				return section.item.captionSize3;
			}
		} else {
			return 10; // default size
		}
	});

	const { theme } = useTheme();

	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(captionSize);

	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};

	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};

	const formik = useFormik<{ caption: string }>({
		initialValues: {
			caption: caption,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionGallery(position, section.item.id, {
					...formData,
					captionSize: fontSize,
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
					className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green'
						}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}
				>{toast.message}</div>
			)}

			<form className="lg:flex max-lg:flex-col items-between m-4" onSubmit={formik.handleSubmit}>
				<input
					id="caption"
					name="caption"
					value={formik.values.caption}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none bg-transparent
					${theme === 'modern' ? modern.imageInputBackground : ''}
					${formik.touched.caption && formik.errors.caption ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>

				{formik.errors.caption && formik.touched.caption && (
					<p className="text-red-500 text-xs">{formik.errors.caption}</p>
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

export default InputSectionGallery;
