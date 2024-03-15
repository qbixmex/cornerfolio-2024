"use client";

import { signUpFetch } from "@/api/signUp.fetch";
import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

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
  class: yup
    .string()
    .min(4, "Class must be at least 4 characters")
    .required("Class is required !"),
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

// type FormData = {
//   name: string;
//   password: string;
//   confirmPassword: string;
// };

// const FORM_DATA: FormData = {
//   name: "",
//   password: "",
//   confirmPassword: "",
// };

export function SignUpForm() {
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
    onSubmit: async (formData) => {
      console.log(formData);
      const data = await signUpFetch(formData);

      if (data.error) {
        setToast({ message: data.error, type: "error" });
      } else {
        setToast({ message: data.message, type: "success" });
        // redirect("/");
      }
      setTimeout(() => setToast({ message: "", type: "" }), 4000);
    },
  });

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  //   const [error, setError] = useState<string | null>(null);
  //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //   const [formData, setFormData] = useState<FormData>(FORM_DATA);
  //   const [state, formAction] = useFormState<ErrorState, globalThis.FormData>(
  //     getUserData,
  //     {}
  //   );

  //   const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setFormData({
  //       ...formData,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   useEffect(() => {
  //     if (state.error) {
  //       setErrorMessage(state.error);
  //       setTimeout(() => {
  //         setErrorMessage(null);
  //       }, 3000);
  //     }
  //   }, [state]);

  //   const { name, password, confirmPassword } = formData;

  //   const validateConfirmPassword = () => {
  //     if (password !== confirmPassword) {
  //       setError("Your passwords are not matching, please check again");
  //     } else {
  //       setError(null);
  //     }
  //   };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 h-screen">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register New Account
      </h2>
      {/* {toast.message && (
        <div
          className={`fixed z-[100] top-5 right-5 w-fit bg-${
            toast.type === "error" ? "red" : "green"
          }-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${
            styles.slideLeft
          }`}
        >
          {toast.message}
        </div>
      )} */}
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              autoComplete="off"
            />
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2",
                {
                  "border-2 border-red-500 bg-red-100 text-red-800":
                    formik.touched.password && formik.errors.password,
                }
              )}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password:
            </label>
            <input
              type="password"
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
                    formik.touched.password && formik.errors.password,
                }
              )}
            />
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              In which Class are you enrolled?
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formik.values.course}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              autoComplete="off"
            />
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
          <button
            type="submit"
            // disabled={!!error}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
