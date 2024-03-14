import { useState } from 'react';
import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '@/users/components/profile.module.css';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionText;
};

const formSchemaContent = yup.object().shape({
	content: yup.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
	contentSize: yup.number()
		.min(10, 'Text size must be at least 10')
		.max(40, 'Text size cannot exceed 40')
		.integer('Text size must be an integer')
		.required('Text size is required')
});

const InputSectionTextContent: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ content: string, contentSize: number }>({
		initialValues: {
			content: section.item.content,
			contentSize: section.item.contentSize
		},
		validationSchema: formSchemaContent,
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
				<textarea
					id="content"
					name="content"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none text-[${formik.values.contentSize}px] ${formik.touched.content && formik.errors.content ? 'border-2 border-red-500' : 'border-0'}`}
				/>
				{formik.errors.content && formik.touched.content && (
					<p className="text-red-500 text-xs">
						{formik.errors.content}
					</p>
				)}
				<div className='text-xs'>
					fontSize:
					<input 
						id="contentSize"
						name="contentSize"
						type="number"
						className={`w-10 ${formik.touched.contentSize && formik.errors.contentSize ? 'border-2 border-red-500' : 'border-0'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.contentSize}
					/>px
				</div>
				{formik.errors.contentSize && formik.touched.contentSize && (
					<p className="text-red-500 text-xs">
						{formik.errors.contentSize}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.content || formik.errors.contentSize ? 'hidden' : ''} hover:bg-gray-200 flex text-xs w-9  justify-center slef-center rounded-md border h-8`}
				>
					save
				</button>
			</form>
		</div>
	);
};
export default InputSectionTextContent