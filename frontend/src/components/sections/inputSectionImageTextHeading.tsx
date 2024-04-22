import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { setToast } from '@/store/slices/toast.slice';
import clsx from 'clsx';

type Props = {
	portfolioId: string;
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtHeading: yup
		.string()
		.min(1, 'Heading must be at least 1 character')
		.required('Heading is required !'),
});

const InputSectionImageTextHeading: React.FC<Props> = ({ portfolioId, section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.txtHeadingSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => prevSize + 2);
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
	};

	const formik = useFormik<{ txtHeading: string }>({
		initialValues: {
			txtHeading: section.item.txtHeading,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				const data = await updateSectionImageText(portfolioId, section.item.id, {
					...formData,
					txtHeadingSize: fontSize,
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
			<section className="w-full flex flex-col items-between border-transparent border rounded-md hover:border-gray-200">
				<section className="p-3">
					<input
						id="txtHeading"
						name="txtHeading"
						type="text"
						value={formik.values.txtHeading}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ fontSize: true ? fontSize : '' }}
						className={clsx("w-full outline-1 outline-gray-200 bg-transparent text-stone-600 py-2 px-3", {
							[modern.headerFieldInput]: theme === 'modern',
							"border-2 border-red-500 rounded-md": (formik.touched.txtHeading) && (formik.errors.txtHeading)
						})}
					/>
					{formik.errors.txtHeading && formik.touched.txtHeading && (
						<p className="text-red-500 text-xs my-3">{formik.errors.txtHeading}</p>
					)}
				</section>
				<section className="flex gap-3 mx-6 mb-3">
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

export default InputSectionImageTextHeading;
