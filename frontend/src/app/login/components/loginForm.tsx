'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { fetchLogin } from '@/api/login.fetch';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from '@/store';
import { setToast } from '../../../store/slices/toast.slice';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required !"),
});

type FormData = {
  email: string;
  password: string;
};

const FORM_DATA: FormData = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formik = useFormik<FormData>({
    initialValues: FORM_DATA,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      const data = await fetchLogin(formData);

      if (data.error) {
        dispatch(setToast({ message: data.error, type: "error" }));
      }

      if (data.message) {
        setCookie('token', data.token);
        dispatch(setToast({ message: data.message, type: "success" }));
      } 

      formik.resetForm();

      router.push('/admin/portfolio-management');
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                  {
                    "border-2 border-red-500 bg-red-100 text-red-800":
                      formik.touched.email && formik.errors.email,
                  }
                )}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 ml-1 my-3">{formik.errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <section className="flex items-center gap-3 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={clsx(
                    "block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                    {
                      "border-2 border-red-500 bg-red-100 text-red-800":
                        formik.touched.password && formik.errors.password,
                    }
                  )}
                />
                <div
                  className={clsx(
                    `text-gray-300 absolute right-2 cursor-pointer`,
                    { "text-blue-800": showPassword }
                  )}
                >
                  {showPassword ? (
                    <FaEye
                      size={25}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <FaEyeSlash
                      size={25}
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                </div>
              </section>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 ml-1 my-3">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <section className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-between items-end lg:items-center lg:justify-between">
            <span className="text-gray-600 order-2 lg:order-1">
              <span className="mr-2">Not a member?</span>
              <Link
                href={"/register"}
                className="text-blue-700 hover:text-blue-500"
              >
                Register
              </Link>
            </span>
            <button
              type="submit"
              className="flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              login
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
