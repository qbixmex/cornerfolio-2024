import { useState } from 'react';
import { SectionImage } from '@/interfaces';
import { updateSectionImage } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionImage;
};

const formSchema = yup.object().shape({
	caption: yup.string()
		.min(1, 'Caption must be at least 1 character')
		.required('Caption is required !'),
	captionSize: yup.number()
		.min(10, 'Text size must be at least 10')
		.max(40, 'Text size cannot exceed 40')
		.integer('Text size must be an integer')
		.required('Text size is required')
});

const InputSectionImage: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch()
	const formik = useFormik<{ caption: string, captionSize:number }>({
		initialValues: {
			caption: section.item.caption,
			captionSize: section.item.captionSize
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true
				
				const data = await updateSectionImage(section.item.id, formData);
				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating image:', error);
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
				<input
					id="caption"
					name="caption"
					value={formik.values.caption}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none text-[${formik.values.captionSize}px] ${formik.touched.caption && formik.errors.caption ? 'border-2 border-red-500' : 'border-0'} `}
					type="text"
				/>
				{formik.errors.caption && formik.touched.caption && (
					<p className="text-red-500 text-xs">
						{formik.errors.caption}
					</p>
				)}
				<div className='text-xs'>
					fontSize:
					<input 
						id="captionSize"
						name="captionSize"
						type="number"
						className={`w-10 ${formik.touched.captionSize && formik.errors.captionSize ? 'border-2 border-red-500' : 'border-0'}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.captionSize}
					/>px
				</div>
				{formik.errors.captionSize && formik.touched.captionSize && (
					<p className="text-red-500 text-xs">
						{formik.errors.captionSize}
					</p>
				)}
				<button
					type="submit"
					className={`${formik.errors.caption || formik.errors.captionSize ? 'hidden' : ''} hover:bg-gray-200 flex text-xs w-9 h-8 justify-center slef-center rounded-md border`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionImage;
