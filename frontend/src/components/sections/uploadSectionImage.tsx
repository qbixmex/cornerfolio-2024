import { updateSectionImage } from '@/sections/actions/section.update.action';
import { SectionImage } from '@/interfaces';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { useFormik } from 'formik';
import * as yup from 'yup'
import clsx from 'clsx';
import { useState } from 'react';
import { uploadSectionImage } from '@/sections/actions/section.update.action';

type Props = {
    section: SectionImage;
};

type UploadImage = {
    image: File;
};

export const formSchema = yup.object().shape({
        image: yup.mixed().required('Image is required'), 
    });

const UploadSectionImage: React.FC<Props> = ({ section }) => {
    const [imageFieldKey, setImageFieldKey] = useState(Date.now());
    const dispatch = useAppDispatch();
    
    const formik = useFormik<{ image:File | null}>({
		initialValues: {
            image: null,
		},
		validationSchema: formSchema,
		onSubmit: async (values) => {
			try {
                dispatch(setReloading(true))
                if (values.image) {
                    console.log(values.image)
                    await uploadSectionImage(section.item.id, values.image);
                    console.log('Image uploaded successfully');
                } else {
                    throw new Error('No image selected');
                }
			} catch (error) {
				console.log(error);
				setToast({ message: `Error updating divider, check logs !`, type: 'error' });
			} finally {
				dispatch(setReloading(false)); // reloading false
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
                setImageFieldKey(Date.now());
			}
		},
	});
        
    const [toast, setToast] = useState({
		message: '',
		type: ''
	});

    return (
        <div className='flex justify-around w-full text-xs'>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <input
                key={imageFieldKey}
                id="image"
                type="file"
                name="image"
                className="mb-5"
                onChange={(event) => {
                    return formik.setFieldValue('image', event.target.files![0]);
                }}
                />
                
                <button type="submit">Upload Image</button>
            </form>
            {toast.message && (
                <div className={clsx('toast', toast.type)}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default UploadSectionImage;