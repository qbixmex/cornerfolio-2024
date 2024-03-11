import React, { useState } from 'react';
import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';

type Props = {
	section: SectionImageText;
};

const formSchema = yup.object().shape({
	txtContent: yup.string()
		.min(1, 'txtContent must be at least 1 character')
		.required('txtContent is required !'),
});

const InputSectionImageTextContent: React.FC<Props> = ({ section }) => {
	const formik = useFormik<{ txtContent: string }>({
		initialValues: {
			txtContent: section.item.txtContent
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			const data = await updateSectionImageText(section.item.id, formData);
			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
			}
			setTimeout(() => setToast({ message: '', type: '' }), 4000);
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
					id="txtContent"
					name="txtContent"
					value={formik.values.txtContent}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full h-40 outline-none text-[${section.item.txtContentSize}px] ${formik.touched.txtContent && formik.errors.txtContent ? 'border-2 border-red-500' : 'border-0'}`}
				/>
				{formik.errors.txtContent && formik.touched.txtContent && (
					<p className="text-red-500 text-xs">
						{formik.errors.txtContent}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.txtContent ? 'hidden' : ''} hover:bg-gray-200 flex text-xs justify-center slef-center rounded-md border h-8 w-9`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionImageTextContent;