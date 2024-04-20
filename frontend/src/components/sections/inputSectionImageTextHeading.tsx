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

type Props = {
	portfolioId: string;
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtHeading: yup
		.string()
		.min(1, 'txtHeading must be at least 1 character')
		.required('txtHeading is required !'),
});

const InputSectionImageTextHeading: React.FC<Props> = ({ portfolioId, section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.txtHeadingSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
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
		<div>
			<form
				className="lg:flex max-lg:flex-col items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<input
					id="txtHeading"
					name="txtHeading"
					value={formik.values.txtHeading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none bg-transparent
					${theme === 'modern' ? modern.headerFieldInput : ''}
					${formik.touched.txtHeading && formik.errors.txtHeading ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.txtHeading && formik.touched.txtHeading && (
					<p className="text-red-500 text-xs">{formik.errors.txtHeading}</p>
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

export default InputSectionImageTextHeading;
