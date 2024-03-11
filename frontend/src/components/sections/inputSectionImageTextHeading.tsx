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
	txtHeading: yup.string()
		.min(1, 'txtHeading must be at least 1 character')
		.required('txtHeading is required !'),
});

const InputSectionImageTextHeading: React.FC<Props> = ({ section }) => {
	const formik = useFormik<{ txtHeading: string }>({
		initialValues: {
			txtHeading: section.item.txtHeading
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
				<input
					id="txtHeading"
					name="txtHeading"
					value={formik.values.txtHeading}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none text-[${section.item.txtHeadingSize}px] ${formik.touched.txtHeading && formik.errors.txtHeading ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
				/>
				{formik.errors.txtHeading && formik.touched.txtHeading && (
					<p className="text-red-500 text-xs">
						{formik.errors.txtHeading}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.txtHeading ? 'hidden' : ''} hover:bg-gray-200 flex text-xs justify-center slef-center rounded-md border h-8 w-9`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionImageTextHeading
