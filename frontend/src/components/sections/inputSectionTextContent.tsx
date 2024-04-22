import { useState } from 'react';
import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';

type Props = {
	portfolioId: string;
	section: SectionText;
};

const formSchemaContent = yup.object().shape({
	content: yup
		.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
});

const InputSectionTextContent: React.FC<Props> = ({ portfolioId, section }) => {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();
	const [fontSize, setFontSize] = useState<number>(section.item.contentSize);

	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 2 : prevSize));
	};

	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
	};

	const formik = useFormik<{ content: string }>({
		initialValues: {
			content: section.item.content,
		},
		validationSchema: formSchemaContent,
		onSubmit: async (formData) => {
			try {
				const data = await updateSectionText(portfolioId, section.item.id, {
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
				console.error('Error updating text:', error);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<section className="w-full flex flex-col justify-between items-start gap-3 p-3">
				<section className="w-full">
					<textarea
						id="content"
						name="content"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						rows={8}
						style={{ fontSize: true ? fontSize : '' }}
						className={
							clsx(styles.sectionImageTextDescription, {
								'text-stone-600': theme === 'light',
								'text-gray-50 bg-transparent': theme === 'dark',
								[modern.description]: theme === 'modern',
								"border-2 border-red-500": (formik.touched.content) && (formik.errors.content)
							})
						}
					>{formik.values.content}</textarea>
					{formik.errors.content && formik.touched.content && (
						<p className="text-red-500 text-xs">{formik.errors.content}</p>
					)}
				</section>
				<section className="flex gap-3">
					<p className="flex items-center text-gray-400 text-sm font-normal">
						{fontSize}px
					</p>
					<ButtonsSize
						decrementFontSize={decrementFontSize}
						incrementFontSize={incrementFontSize}
						formik={formik}
					/>
				</section>
			</section>
		</form>
	);
};
export default InputSectionTextContent;
