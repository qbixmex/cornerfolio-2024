'use client';
import { useFormik } from 'formik';
import { UserIcon } from '@/components/icons';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup.string()
    .min(4, { message: 'Name must be at least 4 characters' })
    .required('Name is required !'),
  email: yup.string().required('Email is required !'),
  password: yup.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100, { message: 'Password must be maximum 100 characters' })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
      message: 'Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.'
    })
    .required('Password is required !'),
  passwordConfirmation: yup.string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(100, { message: 'Password must be maximum 100 characters' })
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
    message: 'Password must contain minimum 5 characters, 1 uppercase letter, 1 lowercase letter, 1 numeric digit.'
  })
  .required('Password is required !')
  .oneOf([yup.ref('password'), ''], { message: 'Passwords must match !' }),
  jobTitle: yup.string().required('Job Title is required !'),
});

type User = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  type: 'student' | 'client' | 'admin';
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  active: false;
  course: string;
  schedule: 'morning' | 'afternoon' | 'evening';
};

const CreateUserForm = () => {

  const formik = useFormik<User>({
    initialValues: {
      name: 'Michael Jackson',
      email: 'michael@moonwalker.com',
      password: 'annie_are_you_ok',
      passwordConfirmation: 'annie_are_you_ok',
      type: 'student',
      jobTitle: 'Singer',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-01-01'),
      active: false,
      course: 'Web Development',
      schedule: 'afternoon',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // handle form submission here
      console.log(values);
    },
  });

  console.log(formik.errors.name)

  return (
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
          </section>

          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 ml-5 my-2">
              {/* {(formik.errors.name as { message: string }).message} */}
            </p>
          )}

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
              className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
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
              className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
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
        </section>
      </section>

      <section className="grid grid-cols-2 w-full gap-10">
        <section>
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
              value={formik.values.startDate.toISOString().split('T')[0]}
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
              defaultValue={formik.values.endDate.toISOString().split('T')[0]}
              onChange={formik.handleChange}
              className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
          </section>
        </section>

        <section>
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
                className="font-medium text-gray-900">Active</label>
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

      <section className="w-full flex justify-start md:justify-end">
        <button
          type="submit"
          className="flex w-full md:w-[150px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          create
        </button>
      </section>
    </form>
  );
};

export default CreateUserForm;