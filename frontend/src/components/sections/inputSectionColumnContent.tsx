import { SectionColumn } from '@/interfaces';
import { updateSectionColumn } from '@/sections/actions/section.update.action';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';
import ButtonsSize from '../buttonsSize';

type Props = {
    position: 1 | 2 | 3;
	section: SectionColumn;
};

const formSchemaContent = yup.object().shape({
	content: yup
		.string()
		.min(1, 'Content must be at least 1 character')
		.required('Content is required !'),
});

const InputSectionColumnContent: React.FC<Props> = ({position, section }) => {
    const [content, setContent] = useState(() => {
        if (section) {
            if (position === 1) {
                return section.item.content1;
            } else if (position === 2) {
                return section.item.content2;
            } else {
                return section.item.content3;
            }
        } else {
            return 'This is content';
        }
    });
    
    const [contentSize, setContentSize] = useState(() => {
        if (section) {
            if (position === 1) {
                return section.item.contentSize1;
            } else if (position === 2) {
                return section.item.contentSize2;
            } else {
                return section.item.contentSize3;
            }
        } else {
            return 10; // default size
        }
    });

	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const [fontSize, setFontSize] = useState<number>(contentSize);
	const incrementFontSize = () => {
		setFontSize((prevSize) => (prevSize < 40 ? prevSize + 1 : prevSize));
	};
	const decrementFontSize = () => {
		setFontSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
	};
	const formik = useFormik<{ content: string }>({
		initialValues: {
			content: content,
		},
		validationSchema: formSchemaContent,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updateSectionColumn(position,section.item.id, {
					...formData,
					contentSize: fontSize,
				});

				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating column:', error);
			} finally {
				dispatch(setReloading(false)); // reloading false
			}
		},
	});

	const [toast, setToast] = useState({
		message: '',
		type: '',
	});

	return (
		<div>
			{toast.message && (
				<div
					className={`fixed z-[100] top-5 right-5 w-fit bg-${
						toast.type === 'error' ? 'red' : 'green'
					}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}
				>
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
					className={`w-full h-40 outline-none bg-transparent
					${theme === 'modern' ? modern.textInputBackground : ''} ${
						formik.touched.content && formik.errors.content ? 'border-2 border-red-500' : 'border-0'
					}`}
					style={{ fontSize: true ? fontSize : '' }}
				/>
				{formik.errors.content && formik.touched.content && (
					<p className="text-red-500 text-xs">{formik.errors.content}</p>
				)}

				<div className="text-sm flex gap-1 mr-2">
				<ButtonsSize
					decrementFontSize={decrementFontSize}
					incrementFontSize={incrementFontSize}
					formik={formik}
				/>
				</div>
			</form>
		</div>
	);
};
export default InputSectionColumnContent;
