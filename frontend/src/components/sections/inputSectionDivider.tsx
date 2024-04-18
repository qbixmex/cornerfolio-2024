import { SectionDivider } from '@/interfaces';
import { updateSectionDivider } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from '@/context/portfolio-theme-context';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import ButtonsSize from '../buttonsSize';
import { setToast } from '@/store/slices/toast.slice';

type Props = {
	section: SectionDivider;
};

const formSchema = yup.object().shape({
	title: yup.string().min(1, 'Title must be at least 1 character').required('Title is required !'),
});

const InputSectionDivider: React.FC<Props> = ({ section }) => {
	const { theme } = useTheme();

	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(section.item.titleSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};

	const formik = useFormik<{ title: string }>({
		initialValues: {
			title: section.item.title,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionDivider(section.item.id, {
					...formData,
					titleSize: fontSize,
				});

				if (data.error) {
					dispatch(setToast({ message: data.error, type: 'error' }));
				} else {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.log(error);
				dispatch(setToast({ message: `Error updating divider, check logs !`, type: 'error' }));
			} finally {
				dispatch(setReloading(false)); // reloading false
			}
		},
	});

	return (
		<div>
			<form className="lg:flex max-lg:flex-col items-between m-4" onSubmit={formik.handleSubmit}>
				<input
					id="title"
					name="title"
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none bg-transparent
					${theme === 'modern' ? modern.dividerInputBackground : ''} 
					${formik.touched.title && formik.errors.title ? 'border-2 border-red-500' : 'border-0'} `}
					style={{ fontSize: true ? fontSize : '' }}
					type="text"
				/>
				{formik.errors.title && formik.touched.title && (
					<p className="text-red-500 text-xs">{formik.errors.title}</p>
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

export default InputSectionDivider;
