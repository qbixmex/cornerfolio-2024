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
import clsx from 'clsx';

type Props = {
	portfolioId: string;
	section: SectionText;
};

const formSchemaHeading = yup.object().shape({
	heading: yup
		.string()
		.min(1, 'Heading must be at least 1 character')
		.required('Heading is required !'),
});

const InputSectionTextHeading: React.FC<Props> = ({ portfolioId, section }) => {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();
	const [fontSize, setFontSize] = useState<number>(section.item.headingSize);

	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 2 : prevSize));
	};

	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize));
	};

	const formik = useFormik<{ heading: string }>({
		initialValues: {
			heading: section.item.heading,
		},
		validationSchema: formSchemaHeading,
		onSubmit: async (formData) => {
			try {
				const data = await updateSectionText(portfolioId, section.item.id, {
					...formData,
					headingSize: fontSize,
				});

				if (data.error) {
					dispatch(setToast({ message: data.error, type: 'error' }));
				}

				if (data.message) {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.error(error);
				setToast({ message: 'Error updating text, check logs !', type: 'error' });
			}

		},
	});

	return (
		<form className="w-full" onSubmit={formik.handleSubmit}>
			<section className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between hover:border hover:border-gray-200 rounded-md px-3">
				<section className="w-full flex flex-col my-4">
					<input
						id="heading"
						name="heading"
						type="text"
						value={formik.values.heading}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ fontSize: true ? fontSize : '' }}
						className={clsx(`w-full outline-1 outline-gray-200 p-2`, {
							"text-stone-600": theme === 'light',
							[modern.headerFieldInput]: theme === 'modern',
							"text-gray-50 bg-transparent": theme === 'dark',
							"border-2 border-red-500": (formik.touched.heading) && (formik.errors.heading),
						})}
					/>
					{formik.errors.heading && formik.touched.heading && (
						<p className="text-red-500 text-xs my-4">{formik.errors.heading}</p>
					)}
				</section>
				<section className="flex items-center gap-3 mb-3 lg:mb-0">
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

export default InputSectionTextHeading;
