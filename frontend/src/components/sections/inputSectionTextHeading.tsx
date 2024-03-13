import { useState } from 'react';
import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionText;
};

const formSchemaHeading = yup.object().shape({
	heading: yup.string()
		.min(1, 'Heading must be at least 1 character')
		.required('Heading is required !'),
});

const InputSectionTextHeading: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ heading: string }>({
		initialValues: {
			heading: section.item.heading
		},
		validationSchema: formSchemaHeading,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionText(section.item.id, formData);

				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating text:', error);
			} finally {
				dispatch(setReloading(false)); // reloading false
			}
		},
	});

	const [toast, setToast] = useState({
		message: '',
		type: ''
	});

	return (
		<div>
			{toast.message && (
				<div className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green'}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}>
					{toast.message}
				</div>
			)}
			<form className="flex items-between m-4 border-transparent border-2 hover:border-gray-300" onSubmit={formik.handleSubmit}>
				<input
					id="heading"
					name="heading"
					value={formik.values.heading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none text-[${section.item.headingSize}px] ${formik.touched.heading && formik.errors.heading ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
				/>
				{formik.errors.heading && formik.touched.heading && (
					<p className="text-red-500 text-xs">
						{formik.errors.heading}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.heading ? 'hidden' : ''} hover:bg-gray-200 flex text-xs w-9 h-8 justify-center slef-center rounded-md border`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionTextHeading
