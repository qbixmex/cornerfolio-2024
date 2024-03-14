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
	txtContent: yup.string()
		.min(1, 'txtContent must be at least 1 character')
		.required('txtContent is required !'),
	txtContentSize: yup.number()
		.min(10, 'Text size must be at least 10')
		.max(40, 'Text size cannot exceed 40')
		.integer('Text size must be an integer')
		.required('Text size is required')
});

const InputSectionImageTextContent: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ txtContent: string, txtContentSize: number }>({
		initialValues: {
			txtContent: section.item.txtContent,
			txtContentSize: section.item.txtContentSize
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
				<textarea
					id="txtContent"
					name="txtContent"
					value={formik.values.txtContent}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none text-[${formik.values.txtContentSize}px] ${formik.touched.txtContent && formik.errors.txtContent ? 'border-2 border-red-500' : 'border-0'}`}
				/>
				{formik.errors.txtContent && formik.touched.txtContent && (
					<p className="text-red-500 text-xs">
						{formik.errors.txtContent}
					</p>
				)}

				<div className='text-xs'>
					fontSize:
					<input 
						id="txtContentSize"
						name="txtContentSize"
						type="number"
						className={`w-10 ${formik.touched.txtContentSize && formik.errors.txtContentSize ? 'border-2 border-red-500' : 'border-0'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.txtContentSize}
					/>px
				</div>
				{formik.errors.txtContentSize && formik.touched.txtContentSize && (
					<p className="text-red-500 text-xs">
						{formik.errors.txtContentSize}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.txtContent || formik.errors.txtContentSize ? 'hidden' : ''} hover:bg-gray-200 flex text-xs justify-center slef-center rounded-md border h-8 w-9`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionImageTextContent;