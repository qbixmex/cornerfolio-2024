import React, { useState, useEffect } from 'react';
import { SectionImageText } from '@/interfaces';
import { updateSectionImageText } from '@/sections/actions/section.update.action';
import { useFormik } from 'formik';
import * as yup from 'yup'
import styles from '@/users/components/profile.module.css';


type Props = {
    section: SectionImageText;
};

const formSchema = yup.object().shape({
    imgCaption: yup.string()
        .min(1, 'imgCaption must be at least 1 character')
        .required('imgCaption is required !'),
    });

const InputSectionImageTextCaption: React.FC<Props> = ({ section }) => {
    const formik = useFormik<{ imgCaption: string }>({
        initialValues: {
            imgCaption: section.item.imgCaption
        },
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            const data = await updateSectionImageText(section.item.id,formData);
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
				<div className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green' }-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}>
					{toast.message}
				</div>
			)}
            <form className="flex items-between m-4" onSubmit={formik.handleSubmit}>
                <input 
                id="imgCaption" 
                name="imgCaption"
                value={formik.values.imgCaption}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full outline-none text-[${section.item.imgCaptionSize}px] ${formik.touched.imgCaption && formik.errors.imgCaption ? 'border-2 border-red-500': 'border-0'} `}
                type="text"
                />
                {formik.errors.imgCaption && formik.touched.imgCaption && (
                <p className="text-red-500 text-xs">
                    {formik.errors.imgCaption}
                </p>
                )}
                <button
                    type="submit"
                    className={`${formik.errors.imgCaption ? 'hidden':''} hover:bg-gray-200 flex text-xs w-9 h-8 justify-center slef-center rounded-md border`}
                >
                    save
                </button>
            </form>
        </div>
    );
};

export default InputSectionImageTextCaption;
