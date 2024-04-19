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
		.min(1, 'txtContent must be at least 1 character')
		.required('txtContent is required !'),
});

const InputSectionImageTextContent: React.FC<Props> = ({ portfolioId, section }) => {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();
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
		<div>
			<form
				className="lg:flex max-lg:flex-col items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<textarea
					id="txtContent"
					name="txtContent"
					value={formik.values.txtContent}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none bg-transparent
					${formik.touched.txtContent && formik.errors.txtContent ? 'border-2 border-red-500' : 'border-0'}
					${clsx(
						styles.sectionImageTextDescription, {
							'text-stone-600': theme === 'light',
							'text-white': theme === 'dark',
							[modern.description]: theme === 'modern',
						}
					)}
					`}
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
