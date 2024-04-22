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
import clsx from 'clsx';

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
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 4 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 4 : prevSize));
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
		<form className="w-full" onSubmit={formik.handleSubmit}>
			<section className="p-2">
				<section className="flex flex-col lg:flex-row justify-center items-between m-4 gap-3">
					<input
						id="title"
						name="title"
						value={formik.values.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type="text"
						style={{ fontSize: true ? fontSize : '' }}
						className={clsx("w-full outline-none bg-transparent", {
							"text-stone-600": theme === 'light',
							"text-gray-50": (theme === 'dark') || (theme === 'modern'),
							"border-2 border-red-500": (formik.touched.title) && (formik.errors.title),
						})}
					/>
					{formik.errors.title && formik.touched.title && (
						<p className="text-red-500 text-xs">{formik.errors.title}</p>
					)}
				</section>
				<section className="flex items-center gap-3 mx-5 mb-3">
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

export default InputSectionDivider;
