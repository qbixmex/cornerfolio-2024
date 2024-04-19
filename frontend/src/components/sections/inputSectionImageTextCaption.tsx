"use client";

import { SectionImageText } from '@/interfaces';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';
import styles from '@/app/[tinyUrl]/tiny-url.module.css';
import clsx from 'clsx';

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
	const dispatch = useAppDispatch();
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
				dispatch(setToast({ message: data.error, type: 'error' }));
			}

			if (data.message) {
				dispatch(setToast({ message: data.message, type: 'success' }));
			}
		},
	});

	return (
		<div>
			<form className="lg:flex max-lg:flex-col justify-center items-center m-4" onSubmit={formik.handleSubmit}>
				<section className="mr-3">
					<input
						id="imgCaption"
						name="imgCaption"
						value={formik.values.imgCaption}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						autoComplete="off"
						className={`w-full outline-none bg-transparent
						${clsx(
							styles.sectionImageCaption,
							{
								[modern.imageInputBackground]: theme === 'modern',
								'text-white': theme !== 'light',
							},
						)}
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
