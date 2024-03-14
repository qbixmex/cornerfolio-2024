'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchLogin } from '@/api/login.fetch';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import styles from '../login.module.css';

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
  const [ toast, setToast ] = useState({
    message: "",
    type: "",
  });

  const formik = useFormik<FormData>({
    initialValues: FORM_DATA,
    validationSchema: formSchema,
    onSubmit: async (formData) => {
      const data = await fetchLogin(formData);
      console.log(data);
      if (data.error) {
        setToast({ message: data.error, type: "error" });
      } else {
        setToast({ message: data.message, type: "success" });
      }
      setTimeout(() => setToast({ message: "", type: "" }), 2500);
      formik.resetForm();
      setTimeout(() => {
        router.push(`/admin/users/profile/${data.user.id}`);
      }, 3000)
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

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

      {toast.message && (
        <div className={
        clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`,
        {
          "bg-red-500": toast.type === "error",
          "bg-green-500": toast.type === "success",
        }
      )}>{toast.message}</div>)}

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
              <div className="text-sm">
                <Link
                  href={"/"}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password ?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                  {
                    "border-2 border-red-500 bg-red-100 text-red-800":
                      formik.touched.password && formik.errors.password,
                  }
                )}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 ml-1 my-3">
                  {formik.errors.password}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="mt-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  {showPassword ? "hide" : "show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            href={"/register"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
