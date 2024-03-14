import { useState } from 'react';
import { SectionDivider } from '@/interfaces';
import { updateSectionDivider } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';

type Props = {
	section: SectionDivider;
};

const formSchema = yup.object().shape({
	title: yup.string()
		.min(1, 'Title must be at least 1 character')
		.required('Title is required !'),
});

const InputSectionDivider: React.FC<Props> = ({ section }) => {
	const dispatch=useAppDispatch();
	const [fontSize,setFontSize]= useState<number>(section.item.titleSize)
	const incrementFontSize = () => {
		setFontSize(prevSize => (prevSize < 40 ? prevSize + 1 : prevSize)); 
	};
	const decrementFontSize = () => {
		setFontSize(prevSize => (prevSize > 10 ? prevSize - 1 : prevSize)); 
	};
	
	const formik = useFormik<{ title: string }>({
		initialValues: {
			title: section.item.title,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true
				const data = await updateSectionDivider(section.item.id, { ...formData, titleSize: fontSize });

				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating divider:', error);
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
					id="title"
					name="title"
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full outline-none ${formik.touched.title && formik.errors.title ? 'border-2 border-red-500' : 'border-0'} `}
					style={{fontSize: true ? fontSize:''}}
					type="text"
				/>
				{formik.errors.title && formik.touched.title && (
					<p className="text-red-500 text-xs">
						{formik.errors.title}
					</p>
				)}

				<div className='text-sm'>
					<button onClick={incrementFontSize}>+</button>
					<button onClick={decrementFontSize}>-</button>
				</div>
				<button
					type="submit"
					className={`${formik.errors.title ? 'hidden' : ''} hover:bg-gray-200 flex text-xs w-9 h-8 justify-center slef-center rounded-md border`}
				>
					save
				</button>
			</form>
		</div>
	);
};

export default InputSectionDivider;
