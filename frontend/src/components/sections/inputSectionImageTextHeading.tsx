import { useState } from 'react';
import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtHeading: yup.string()
		.min(1, 'txtHeading must be at least 1 character')
		.required('txtHeading is required !'),
	txtHeadingSize: yup.number()
		.min(10, 'Text size must be at least 10')
		.max(40, 'Text size cannot exceed 40')
		.integer('Text size must be an integer')
		.required('Text size is required')
});

const InputSectionImageTextHeading: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ txtHeading: string , txtHeadingSize: number}>({
		initialValues: {
			txtHeading: section.item.txtHeading,
			txtHeadingSize: section.item.txtHeadingSize
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true
				const data = await updateSectionImageText(section.item.id, formData);
				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating image-text:', error);
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
					id="txtHeading"
					name="txtHeading"
					value={formik.values.txtHeading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none text-[${formik.values.txtHeadingSize}px] ${formik.touched.txtHeading && formik.errors.txtHeading ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
				/>
				{formik.errors.txtHeading && formik.touched.txtHeading && (
					<p className="text-red-500 text-xs">
						{formik.errors.txtHeading}
					</p>
				)}

				<div className='text-xs'>
					fontSize:
					<input 
						id="txtHeadingSize"
						name="txtHeadingSize"
						type="number"
						className={`w-10 ${formik.touched.txtHeadingSize && formik.errors.txtHeadingSize ? 'border-2 border-red-500' : 'border-0'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.txtHeadingSize}
					/>px
				</div>
				{formik.errors.txtHeadingSize && formik.touched.txtHeadingSize && (
					<p className="text-red-500 text-xs">
						{formik.errors.txtHeadingSize}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.txtHeading || formik.errors.txtHeadingSize? 'hidden' : ''} hover:bg-gray-200 flex text-xs justify-center slef-center rounded-md border h-8 w-9`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionImageTextHeading
