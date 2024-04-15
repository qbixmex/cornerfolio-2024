"use client";

import { setCookie } from 'cookies-next';
import { signUpFetch } from "@/api/signUp.fetch";
import clsx from "clsx";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import styles from "./register.module.css";
import jwt from 'jsonwebtoken';
import { Token } from '@/interfaces';
import Link from 'next/link';

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required !"),
  email: yup
    .string()
    .email("Invalid email format !")
    .required("Email is required !"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be maximum 100 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      "Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit."
    )
    .required("Password is required !"),
  confirmPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be maximum 100 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      "Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit."
    )
    .required("Password is required !")
    .oneOf([yup.ref("password"), ""], "Passwords must match !"),
  jobTitle: yup
    .string()
    .min(4, "Job Title must be at least 4 characters")
    .required("Job Title is required !"),
  course: yup
    .string()
    .min(4, "Course must be at least 4 characters")
    .required("Course is required !"),
  schedule: yup.string().required("Schedule is required !"),
});

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  jobTitle: string;
  course: string;
  schedule: string;
};

export function SignUpForm() {
  const router = useRouter();
  const formik = useFormik<FormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
      course: "",
      schedule: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        jobTitle: values.jobTitle,
        course: values.course,
        schedule: values.schedule,
      };

      const data = await signUpFetch(formData);

      if (data.error) {
        setToast({ message: data.error, type: "error" });
        setTimeout(() => setToast({ message: "", type: "" }), 4000);
      } else {
        const token = jwt.decode(data.token) as Token;
        setCookie('token', data.token);
        setToast({ message: data.message, type: "success" });
        setTimeout(() => setToast({ message: "", type: "" }), 4000);
        router.push(`/admin/users/profile/${token.id}`);
      }

    },
  });

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register New Account
      </h2>
      {toast.message && (
        <div
          className={clsx(
            `fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`,
            {
              "bg-red-500": toast.type === "error",
              "bg-green-500": toast.type === "success",
            }
          )}
        >
          {toast.message}
        </div>
      )}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name User:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                {
                  "border-2 border-red-500 bg-red-100 text-red-800":
                    formik.touched.name && formik.errors.name,
                }
              )}
              autoComplete="off"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
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
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <section className="flex items-center gap-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
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
              <p className="text-red-500 ml-1 my-3">{formik.errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password:
            </label>
            <section className="flex items-center gap-3 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                  {
                    "border-2 border-red-500 bg-red-100 text-red-800":
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword,
                  }
                )}
              />
              <div
                className={clsx(
                  `text-gray-300 absolute right-2 cursor-pointer`,
                  {
                    "text-blue-800": showPassword,
                  }
                )}
              >
                {showConfirmPassword ? (
                  <FaEye
                    size={25}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                ) : (
                  <FaEyeSlash
                    size={25}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                )}
              </div>
            </section>
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="text-red-500 ml-1 my-3 order-first">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              What is your Job Title?
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                {
                  "border-2 border-red-500 bg-red-100 text-red-800":
                    formik.touched.jobTitle && formik.errors.jobTitle,
                }
              )}
              autoComplete="off"
            />
            {formik.errors.jobTitle && formik.touched.jobTitle && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.jobTitle}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              In which course are you enrolled?
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                {
                  "border-2 border-red-500 bg-red-100 text-red-800":
                    formik.touched.course && formik.errors.course,
                }
              )}
              autoComplete="off"
            />
            {formik.errors.course && formik.touched.course && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.course}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="schedule"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Select one of these schedule hour:
            </label>
            <select
              id="schedule"
              name="schedule"
              onChange={formik.handleChange}
              defaultValue={formik.values.schedule}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            >
              <option value="">Select an hour</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <section className="w-full flex flex-col gap-y-3 justify-start items-end lg:items-center lg:flex-row lg:gap-y-0 lg:justify-between">
            <span className="order-2 lg:order-1 text-right lg:text-left">
              <span className="text-gray-600 mr-2">Already registered ?</span>
              <Link className="text-blue-700 hover:text-blue-500" href="/login">Login</Link>
            </span>
            <button
              type="submit"
              className="flex w-full order-1 lg:order-2 lg:w-fit justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Register</button>
          </section>
        </form>
      </div>
    </div>
  );
}
