import React, { useState } from 'react';
import { SectionText } from '@/interfaces';
import { updateSectionText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';
import { setReloading } from "@/store/slices/reload.slice";
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionText;
};

const formSchemaContent = yup.object().shape({
	content: yup.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
});

const InputSectionTextContent: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ content: string }>({
		initialValues: {
			content: section.item.content
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
			<form className="flex items-between m-4" onSubmit={formik.handleSubmit}>
				<textarea
					id="content"
					name="content"
					value={formik.values.content}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none text-[${section.item.contentSize}px] ${formik.touched.content && formik.errors.content ? 'border-2 border-red-500' : 'border-0'}`}
				/>
				{formik.errors.content && formik.touched.content && (
					<p className="text-red-500 text-xs">
						{formik.errors.content}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.content ? 'hidden' : ''} hover:bg-gray-200 flex text-xs w-9  justify-center slef-center rounded-md border h-8`}
				>
					save
				</button>
			</form>
		</div>
	);
};
export default InputSectionTextContent