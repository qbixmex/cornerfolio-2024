"use client";

import { SectionImageText } from '@/interfaces';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { updateSectionImageText } from '@/sections/actions/section.update.action';

type Props = {
	portfolioId: string;
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	imgCaption: yup
		.string()
		.min(3, 'Image Caption must be at least 1 character')
		.required('Image Caption is required !'),
});

const InputSectionImageTextCaption: React.FC<Props> = ({ portfolioId, section }) => {
	const { theme } = useTheme();

	const [fontSize, setFontSize] = useState<number>(section.item.imgCaptionSize);

	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};

	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};

	const formik = useFormik<{ imgCaption: string }>({
		initialValues: {
			imgCaption: section.item.imgCaption,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			const data = await updateSectionImageText(portfolioId, section.item.id, {
				...formData,
				imgCaptionSize: fontSize,
			});

			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
			}

			setTimeout(() => setToast({ message: '', type: '' }), 4000);
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
			<form className="flex justify-center items-center m-4" onSubmit={formik.handleSubmit}>
				<section className="mr-3">
					<input
						id="imgCaption"
						name="imgCaption"
						value={formik.values.imgCaption}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						autoComplete="off"
						className={`w-full outline-none bg-transparent
						${theme === 'modern' ? modern.imageInputBackground : ''}
						${formik.touched.imgCaption && formik.errors.imgCaption ? 'border-2 border-red-500' : 'border-0'} `}
						type="text"
						style={{ fontSize: true ? fontSize : '' }}
					/>
					{formik.errors.imgCaption && formik.touched.imgCaption && (
						<p className="text-red-500 text-xs mt-3">{formik.errors.imgCaption}</p>
					)}
				</section>

				<ButtonsSize
					decrementFontSize={decrementFontSize}
					incrementFontSize={incrementFontSize}
					formik={formik}
				/>
			</form>
		</div>
	);
};

export default InputSectionImageTextCaption;
