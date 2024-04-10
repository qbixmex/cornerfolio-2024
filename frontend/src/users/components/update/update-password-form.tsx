import { FC, useState } from 'react';
import { useFormik } from 'formik';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserPassword } from '../../interfaces/users';
import { formPasswordsSchema } from '../validation-schemas';
import { updatePassword } from '@/users/actions/user.actions';
import clsx from 'clsx';

type Props = {
  id: string;
  setToast: React.Dispatch<React.SetStateAction<{ message: string, type: string; }>>;
};

const PasswordForm: FC<Props> = ({ id, setToast }) => {

  const [ showPassword, setShowPassword ] = useState(false);
  const [ showPasswordConfirmation, setShowPasswordConfirmation ] = useState(false);

  const formik = useFormik<UserPassword>({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: formPasswordsSchema,
    onSubmit: async (formData) => {
      const data = await updatePassword(id, formData.password);

      if (data.error) {
        setToast({ message: data.error, type: 'error' });
      } else {
        setToast({ message: data.message, type: 'success' });
      }
      formik.resetForm();
      setTimeout(() => setToast({ message: '', type: '' }), 4000);
    },
  });

  return (
    <form className="w-full mb-10" onSubmit={formik.handleSubmit}>
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-10">
        <section className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 mb-4"
          >
            New Password
          </label>
          <section className="flex items-center gap-3 relative">
            <input
              id="password"
              name="password"
              type={ showPassword ? 'text' : 'password' }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(
                `block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { 'border-2 border-red-500': formik.touched.password && formik.errors.password }
              )}
            />
            <div className={clsx(
              `text-gray-300 absolute right-2 cursor-pointer`,
              { 'text-blue-800': showPassword }
            )}>
              { showPassword ? (
                <FaEye size={25} onClick={() => setShowPassword(prev => !prev)} />
              ) : (
                <FaEyeSlash size={25} onClick={() => setShowPassword(prev => !prev)} />
              ) }
            </div>
          </section>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 ml-1 my-3">
              {formik.errors.password}
            </p>
          )}
        </section>
        <section className="mb-10 md:mb-5">
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-medium leading-6 text-gray-900 mb-4"
          >
            Confirm Password
          </label>
          <section className="flex items-center gap-3 relative">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPasswordConfirmation ? 'text' : 'password'}
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(
                `block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { 'border-2 border-red-500': formik.touched.passwordConfirmation && formik.errors.passwordConfirmation }
              )}
            />
            <div className={clsx(
              `text-gray-300 absolute right-2 cursor-pointer`,
              { 'text-blue-800': showPasswordConfirmation }
            )}>
              { showPasswordConfirmation ? (
                <FaEye size={25} onClick={() => setShowPasswordConfirmation(prev => !prev)} />
              ) : (
                <FaEyeSlash size={25} onClick={() => setShowPasswordConfirmation(prev => !prev)} />
              ) }
            </div>
          </section>
          {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && (
            <p className="text-red-500 ml-1 my-3">
              {formik.errors.passwordConfirmation}
            </p>
          )}
        </section>
      </section>
      <section className="w-full flex justify-start md:justify-end">
        <button
          type="submit"
          className="flex w-full md:w-[200px] h-14 md:h-auto justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg md:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          change password
        </button>
      </section>
    </form>
  );

};

export default PasswordForm;
