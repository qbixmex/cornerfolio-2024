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
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
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
		<div>
			<form
				className="lg:flex max-lg:flex-col items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<input
					id="heading"
					name="heading"
					value={formik.values.heading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none bg-transparent
					${theme === 'modern' ? modern.headerFieldInput : ''} ${
						formik.touched.heading && formik.errors.heading ? 'border-2 border-red-500' : 'border-0'
					}`}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.heading && formik.touched.heading && (
					<p className="text-red-500 text-xs">{formik.errors.heading}</p>
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

export default InputSectionTextHeading;
