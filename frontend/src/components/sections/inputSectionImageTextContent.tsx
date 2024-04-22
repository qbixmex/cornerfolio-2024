import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import clsx from 'clsx';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';


type Props = {
	portfolioId: string;
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtContent: yup
		.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
});

const InputSectionImageTextContent: React.FC<Props> = ({ portfolioId, section }) => {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();
	const [fontSize, setFontSize] = useState<number>(section.item.txtContentSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => prevSize + 2);
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
	};

	const formik = useFormik<{ txtContent: string }>({
		initialValues: {
			txtContent: section.item.txtContent,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				const data = await updateSectionImageText(portfolioId, section.item.id, {
					...formData,
					txtContentSize: fontSize,
				});

				if (data.error) {
					dispatch(setToast({ message: data.error, type: 'error' }));
				}

				if (data.message) {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.error('Error updating image-text:', error);
			}
		},
	});

	return (
		<form className="w-full" onSubmit={formik.handleSubmit}>
			<section className="w-full flex flex-col justify-between items-start gap-3 p-3 border-transparent hover:border hover:border-gray-200 rounded">
				<section className="w-full">
					<textarea
						id="content"
						name="content"
						value={formik.values.txtContent}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ fontSize: true ? fontSize : '' }}
						rows={5}
						className={
							clsx(styles.sectionImageTextDescription, {
								'text-stone-600': theme === 'light',
								'text-gray-50 bg-transparent': theme === 'dark',
								[modern.description]: theme === 'modern',
								"border-2 border-red-500": (formik.touched.txtContent) && (formik.errors.txtContent)
							})
						}
					/>
					
					{formik.errors.txtContent && formik.touched.txtContent && (
						<p className="text-red-500 text-xs">{formik.errors.txtContent}</p>
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

export default InputSectionImageTextContent;
