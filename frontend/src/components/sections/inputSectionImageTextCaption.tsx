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
		<form className="w-full" onSubmit={formik.handleSubmit}>
			<section>
				<section className="flex flex-col lg:flex-row justify-center items-center">
					<section>
						<input
							id="imgCaption"
							name="imgCaption"
							type="text"
							value={formik.values.imgCaption}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							autoComplete="off"
							style={{ fontSize: true ? fontSize : '' }}
							className={clsx("w-full bg-transparent outline-1 outline-gray-200 p-2 rounded-md mb-2", {
									'text-stone-600': theme === 'light',
									"text-gray-50": (theme === 'dark') || (theme === 'modern'),
									'border-2 border-red-500': (formik.touched.imgCaption) && (formik.errors.imgCaption),
								}
							)}
						/>
						{formik.errors.imgCaption && formik.touched.imgCaption && (
							<p className="text-red-500 text-xs mt-3">{formik.errors.imgCaption}</p>
						)}
					</section>
				</section>
				<section className="flex justify-center items-center gap-3 mb-3">
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

export default InputSectionImageTextCaption;
