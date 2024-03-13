'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserIcon } from '@/components/icons';
import { createUser } from '../actions/user.actions';
import styles from '@/users/components/profile.module.css';

const formSchema = yup.object().shape({
  name: yup.string()
    .min(4, 'Name must be at least 4 characters')
    .required('Name is required !'),
  jobTitle: yup.string()
    .min(4, 'Job Title must be at least 4 characters')
    .required('Job Title is required !'),
  email: yup.string()
    .email('Invalid email format !')
    .required('Email is required !'),
  course: yup.string()
    .required('Course is required !')
    .min(8, 'Course must be at least 8 characters')
    .max(50, 'Course must be maximum 100 characters'),
  startDate: yup.string().required('Start Date is required !'),
  endDate: yup.string().required('End Date is required !'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be maximum 100 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.'
    )
    .required('Password is required !'),
  passwordConfirmation: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be maximum 100 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.'
    )
    .required('Password is required !')
    .oneOf([yup.ref('password'), ''], 'Passwords must match !'),
});

type User = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: 'student' | 'client' | 'admin';
  jobTitle: string;
  startDate: string;
  endDate: string;
  active: false;
  course: string;
  schedule: 'morning' | 'afternoon' | 'evening';
};

const CreateUserForm = () => {

  const formik = useFormik<User>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      type: 'student',
      jobTitle: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      active: false,
      course: '',
      schedule: 'morning',
    },
    validationSchema: formSchema,
    onSubmit: async (formData) => {

      const data = await createUser(formData);

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
    <>
      {toast.message && (
				<div className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green' }-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}>
					{toast.message}
				</div>
			)}
      <form className="w-full mb-10" onSubmit={formik.handleSubmit}>
        <section className="grid grid-cols-2 w-full gap-10">
          <section>
            {/* Name */}
            <section className="mb-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                className={`block w-full h-10 rounded-md ${formik.touched.name && formik.errors.name ? 'border-2 border-red-500': 'border-0'} px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 ml-1 my-3">
                  {formik.errors.name}
                </p>
              )}
            </section>
            {/* Job Title */}
            <section className="mb-5">
              <label
                htmlFor="job-title"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Job title
              </label>
              <input
                id="job-title"
                name="jobTitle"
                type="text"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                className={`block w-full h-10 rounded-md ${formik.touched.jobTitle && formik.errors.jobTitle ? 'border-2 border-red-500': 'border-0'} px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
              />
              {formik.errors.jobTitle && formik.touched.jobTitle && (
                <p className="text-red-500 ml-1 my-3">
                  {formik.errors.jobTitle}
                </p>
              )}
            </section>
            {/* Email */}
            <section className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                className={`block w-full h-10 rounded-md ${formik.touched.email && formik.errors.email ? 'border-2 border-red-500': 'border-0'} px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 ml-1 my-3">
                  {formik.errors.email}
                </p>
              )}
            </section>
            {/* Course */}
            <section className="mb-5">
              <label
                htmlFor="course"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Course
              </label>
              <input
                id="course"
                name="course"
                type="text"
                value={formik.values.course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="off"
                className={`block w-full h-10 rounded-md ${formik.touched.course && formik.errors.course ? 'border-2 border-red-500': 'border-0'} px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
              />
              {formik.errors.course && formik.touched.course && (
                <p className="text-red-500 ml-1 my-3">
                  {formik.errors.course}
                </p>
              )}
            </section>
            {/* Start Date */}
            <section className="mb-5">
              <label
                htmlFor="start-date"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Start Date
              </label>
              <input
                id="start-date"
                name="startDate"
                type="date"
                value={new Date(formik.values.startDate).toISOString().split('T')[0]}
                onChange={formik.handleChange}
                className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </section>
            {/* End Date */}
            <section className="mb-5">
              <label
                htmlFor="end-date"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                End Date
              </label>
              <input
                id="end-date"
                name="endDate"
                type="date"
                defaultValue={new Date(formik.values.endDate).toISOString().split('T')[0]}
                onChange={formik.handleChange}
                className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </section>
          </section>
          <section>
            {/* Profile Image */}
            <section className="mb-5">
              <UserIcon className="text-slate-200 w-[225px] mb-5" />
              <label
                htmlFor="userImage"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                Profile Image
              </label>
              <input
                type="file"
                name="image" // <= Change this, this is just a placeholder
                autoComplete="off"
                className="mb-5"
              />
            </section>
             {/* Active */}
             <section className="flex items-start mb-5">
              <div className="flex items-center h-5 gap-x-2">
                <input
                  id="active"
                  type="checkbox"
                  name="active"
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                  value={String(formik.values.active)}
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="active"
                  className="font-medium text-gray-900"
                >Active</label>
              </div>
            </section>
            {/* Schedule */}
            <section className="mb-5">
              <label
                htmlFor="schedule"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Schedule
              </label>
              <select
                id="schedule"
                className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                onChange={formik.handleChange}
                defaultValue={formik.values.schedule}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </section>
          </section>
        </section>
        <section className="grid grid-cols-2 w-full gap-10 mb-5">
          {/* Password */}
          <section className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              className={`block w-full h-10 rounded-md ${formik.touched.password && formik.errors.password ? 'border-2 border-red-500': 'border-0'} px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 ml-1 my-3">
                {formik.errors.password}
              </p>
            )}
          </section>
          {/* Password Confirmation */}
          <section className="mb-5">
            <label
              htmlFor="password-confirmation"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Password Confirmation
            </label>
            <input
              id="password-confirmation"
              name="passwordConfirmation"
              type="password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              className={`block w-full h-10 rounded-md ${formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? 'border-2 border-red-500': 'border-0'} px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`}
            />
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
            className="flex w-full md:w-[150px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            create
          </button>
        </section>
      </form>
    </>
  );
};

export default CreateUserForm;