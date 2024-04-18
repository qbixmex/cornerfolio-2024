import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import clsx from 'clsx';
import { SectionImage } from '@/interfaces';
import { uploadSectionImage } from '@/sections/actions/section.update.action';
import { resetUploadingImage, setUploadingImage } from '@/store/slices/imageUpload.slice';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';

type Props = {
  portfolioId: string;
  section: SectionImage;
};

export const formSchema = yup.object().shape({
  image: yup.mixed().required('Image is required'),
});

const UploadSectionImage: React.FC<Props> = ({ portfolioId, section }) => {
  const [imageFieldKey, setImageFieldKey] = useState(Date.now());
  const dispatch = useAppDispatch();
  const formik = useFormik<{ image: File | null }>({
    initialValues: {
      image: null,
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setUploadingImage({ imageId: section.item.id, loading: true }));

        const formData = new FormData();

        formData.set("image", values.image!);

        const data = await uploadSectionImage(portfolioId, section.item.id, formData);

        if (data.error) {
          dispatch(setToast({ message: data.error, type: 'error' }));
        }
        
        if (data.message) {
          dispatch(setToast({ message: data.message, type: 'success' }));
          setTimeout(() => {
            dispatch(resetUploadingImage());
          }, 500);
        }

      } catch (error) {
        console.error("There has been a problem with your fetch operation: ", error);
        throw error;
      }
      
      setTimeout(() => {
        setImageFieldKey(Date.now());
      }, 3000);
    },
  });

  return (
    <div className='flex justify-around w-full text-xs'>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <section className="my-5 flex gap-x-3 justify-center items-center">
          <section>
            <input
              key={imageFieldKey}
              id="image"
              type="file"
              name="image"
              onChange={(event) => {
                return formik.setFieldValue('image', event.target.files![0]);
              }}
              className={clsx(
                `block w-[300px] h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { 'border-2 border-red-500': formik.touched.image && formik.errors.image }
              )}
            />
            {formik.errors.image && formik.touched.image && (
              <p className="text-red-500 text-xs mt-2">{formik.errors.image}</p>
            )}
          </section>
          <button type="submit" className="my-2 px-5 py-3 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors">upload</button>
        </section>
      </form>
    </div>
  );
}

export default UploadSectionImage;