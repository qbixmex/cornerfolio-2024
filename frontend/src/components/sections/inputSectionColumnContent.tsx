import { useTheme } from '@/context/portfolio-theme-context';
import { SectionColumn } from '@/interfaces';
import { updateSectionColumn } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { setToast } from '@/store/slices/toast.slice';
import clsx from 'clsx';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';

type Props = {
	position: 1 | 2 | 3;
	section: SectionColumn;
};

const formSchemaContent = yup.object().shape({
	content: yup
		.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
});

const InputSectionColumnContent: React.FC<Props> = ({ position, section }) => {
	const { theme } = useTheme();
	const [content] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.content1;
			} else if (position === 2) {
				return section.item.content2;
			} else {
				return section.item.content3;
			}
		} else {
			return 'This is content';
		}
	});

	const [contentSize] = useState(() => {
		if (section) {
			if (position === 1) {
				return section.item.contentSize1;
			} else if (position === 2) {
				return section.item.contentSize2;
			} else {
				return section.item.contentSize3;
			}
		} else {
			return 10; // default size
		}
	});

	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(contentSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};
	const formik = useFormik<{ content: string }>({
		initialValues: {
			content: content,
		},
		validationSchema: formSchemaContent,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionColumn(position, section.item.id, {
					...formData,
					contentSize: fontSize,
				});

				if (data.error) {
					dispatch(setToast({ message: data.error, type: 'error' }));
				}

				if (data.message) {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.error('Error updating column:', error);
			} finally {
				dispatch(setReloading(false)); // reloading false
			}
		},
	});

	return (
		<div>
			<form
				className="lg:flex max-lg:flex-col items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<textarea
					id="content"
					name="content"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none bg-transparent
					${
						formik.touched.content && formik.errors.content ? 'border-2 border-red-500' : 'border-0'
					}
					${clsx(
						styles.sectionColumnDescription, {
						"text-stone-700": theme !== 'light',
						"text-white": theme === 'dark',
						[modern.description]: theme === 'modern',
						}
					)}
					`}
					style={{ fontSize: true ? fontSize : '' }}
				/>

				{formik.errors.content && formik.touched.content && (
					<p className="text-red-500 text-xs">{formik.errors.content}</p>
				)}

				<div className="text-sm flex gap-1 mr-2">
					<ButtonsSize
						decrementFontSize={decrementFontSize}
						incrementFontSize={incrementFontSize}
						formik={formik}
					/>
				</div>
			</form>
		</div>
	);
};
export default InputSectionColumnContent;
