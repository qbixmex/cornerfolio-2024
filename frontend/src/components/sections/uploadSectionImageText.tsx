import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import clsx from 'clsx';
import { SectionImageText } from '@/interfaces';
import { setReloading } from '@/store/slices/reload.slice';
import { useAppDispatch } from '@/store';
import { uploadSectionImageText } from '@/sections/actions/section.update.action';

import styles from '@/users/components/profile.module.css';

type Props = {
  section: SectionImageText;
};

export const formSchema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
});

const UploadSectionImageText: React.FC<Props> = ({ section }) => {
  const [imageFieldKey, setImageFieldKey] = useState(Date.now());
  const dispatch = useAppDispatch();

  const formik = useFormik<{ image: File | null }>({
    initialValues: {
      image: null,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setReloading(true))
        if (values.image) {
          await uploadSectionImageText(section.item.id, values.image);
        } else {
          throw new Error('No image selected');
        }
      } catch (error) {
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
      {toast.message && (
        <div className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green'}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}>
          {toast.message}
        </div>
      )}
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <input
          key={imageFieldKey}
          id="image"
          type="file"
          name="image"
          onChange={(event) => {
            return formik.setFieldValue('image', event.target.files![0]);
          }}

          className={clsx(
            `block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
            { 'border-2 border-red-500': formik.touched.image && formik.errors.image }
          )}
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

export default UploadSectionImageText;