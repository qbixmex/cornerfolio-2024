import { useState } from 'react';
import { SectionGallery } from '@/interfaces';
import { updateSectionGallery } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import * as yup from 'yup';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { setToast } from '@/store/slices/toast.slice';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';

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
	const [caption] = useState(() => {
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

	const [captionSize] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.captionSize1;
			} else if (position === 2) {
				return section.item.captionSize2;
			} else {
				return section.item.captionSize3;
			}
		} else {
			return 16; // default size
		}
	});

	const { theme } = useTheme();

	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(captionSize);

	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 4 : prevSize));
	};

	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 4 : prevSize));
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
					dispatch(setToast({ message: data.error, type: 'error' }));
				}

				if (data.message) {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.log(error);
				dispatch(setToast({ message: `Error updating divider, check logs !`, type: 'error' }));
			} finally {
				dispatch(setReloading(false)); // reloading false
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<section>
				<input
					id="caption"
					name="caption"
					value={formik.values.caption}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					autoComplete="off"
					className={`w-full outline-none bg-transparent
					${clsx(styles.sectionImageCaption, {
						[modern.imageInputBackground]: theme === 'modern',
						'text-white': theme !== 'light',
					})}
					${formik.touched.caption && formik.errors.caption ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.caption && formik.touched.caption && (
					<p className="text-red-500 text-xs mb-4">{formik.errors.caption}</p>
				)}
			</section>

			<section className="flex justify-center gap-3">
				<p className="flex items-center text-gray-400 text-sm font-normal">
					{fontSize}px
				</p>
				<ButtonsSize
					decrementFontSize={decrementFontSize}
					incrementFontSize={incrementFontSize}
					formik={formik}
				/>
			</section>
		</form>
	);
};

export default InputSectionGallery;
