import { SectionImage } from '@/interfaces';
import { updateSectionImage } from '@/sections/actions/section.update.action';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';

type Props = {
	portfolioId: string;
	section: SectionImage;
};

const formSchema = yup.object().shape({
	caption: yup
		.string()
		.required('Image Caption is required !')
		.min(3, 'Image Caption must be at least 3 characters')
});

const InputSectionImage: React.FC<Props> = ({ portfolioId, section }) => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();

	const [fontSize, setFontSize] = useState<number>(section.item.captionSize);

	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};

	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};

	const formik = useFormik<{ caption: string }>({
		initialValues: {
			caption: section.item.caption,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				const data = await updateSectionImage(portfolioId, section.item.id, {
					...formData,
					captionSize: fontSize,
				});

				if (data.error) {
					dispatch(setToast({ message: data.error, type: 'error' }));
				} else {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.log(error);
				setToast({ message: `Error updating divider, check logs !`, type: 'error' });
			}
		},
	});

	return (
		<div>
			<form className="lg:flex max-lg:flex-col items-between m-4" onSubmit={formik.handleSubmit}>
				<section className="w-full mr-5">
					<input
						id="caption"
						name="caption"
						value={formik.values.caption}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						autoComplete="off"
						className={`w-full outline-none bg-transparent mb-2
						${theme === 'modern' ? modern.imageInputBackground : ''}
						${formik.touched.caption && formik.errors.caption ? 'border-2 border-red-500' : 'border-0'} `}
						type="text"
						style={{ fontSize: true ? fontSize : '' }}
					/>
					{formik.errors.caption && formik.touched.caption && (
						<p className="text-red-500 text-xs">{formik.errors.caption}</p>
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

export default InputSectionImage;
