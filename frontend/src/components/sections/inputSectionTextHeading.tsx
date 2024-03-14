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
	headingSize: yup.number()
		.min(10, 'Text size must be at least 10')
		.max(40, 'Text size cannot exceed 40')
		.integer('Text size must be an integer')
		.required('Text size is required')
});

const InputSectionTextHeading: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ heading: string, headingSize: number }>({
		initialValues: {
			heading: section.item.heading,
			headingSize: section.item.headingSize
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
			<form
				className="flex items-between m-4 border-transparent border-2 hover:border-gray-300"
				onSubmit={formik.handleSubmit}
			>
				<input
					id="heading"
					name="heading"
					value={formik.values.heading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none text-[${formik.values.headingSize}px] ${formik.touched.heading && formik.errors.heading ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
				/>
				{formik.errors.heading && formik.touched.heading && (
					<p className="text-red-500 text-xs">
						{formik.errors.heading}
					</p>
				)}
				<div className='text-xs'>
					fontSize:
					<input 
						id="headingSize"
						name="headingSize"
						type="number"
						className={`w-10 ${formik.touched.headingSize && formik.errors.headingSize ? 'border-2 border-red-500' : 'border-0'} `}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.headingSize}
					/>px
				</div>
				{formik.errors.headingSize && formik.touched.headingSize && (
					<p className="text-red-500 text-xs">
						{formik.errors.headingSize}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.heading  || formik.errors.headingSize? 'hidden' : ''} hover:bg-gray-200 flex text-xs w-9 h-8 justify-center slef-center rounded-md border`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionTextHeading
