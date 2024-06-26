import { UserIcon } from "@/components/icons";
import { updateUser } from "@/users/actions/user.actions";
import { UserUpdate } from "@/users/interfaces/users";
import { useAppDispatch, useAppSelector } from "@/store";
import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { formUpdateSchema } from "../validation-schemas";
import { setToast } from "@/store/slices/toast.slice";
import ImageSkeleton from "@/components/sections/imageSkeleton";
import { setUploadingImage } from "@/store/slices/imageUpload.slice";
import Image from "next/image";
import { User } from "@/interfaces";
import { setAuth } from "@/store/slices/auth.slice";

type Props = {
  user: User;
};

const UpdateUserForm: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { imageId, loadingImage } = useAppSelector((state) => state.imageUpload);
  const [imageFieldKey, setImageFieldKey] = useState(Date.now().toString());

  const formik = useFormik<UserUpdate>({
    initialValues: {
      name: user.name,
      email: user.email,
      type: user.type,
      jobTitle: user.jobTitle,
      startDate:
        user.startDate
          ? new Date().toISOString()
          : new Date(user.startDate).toISOString(),
      endDate:
        user.endDate
          ? new Date().toISOString()
          : new Date(user.endDate).toISOString(),
      active: user.active,
      course: user.course,
      schedule: user.schedule,
    },
    validationSchema: formUpdateSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.set("name", values.name!);
      formData.set("email", values.email!);
      formData.set("image", values.image!);
      formData.set("type", values.type!);
      formData.set("jobTitle", values.jobTitle!);
      formData.set("startDate", values.startDate!);
      formData.set("endDate", values.endDate!);
      formData.set("active", String(values.active)!);
      formData.set("course", values.course!);
      formData.set("schedule", values.schedule!);

      dispatch(setUploadingImage({
        imageId: imageFieldKey,
        loading: true,
      }));

      const data = await updateUser(user.id, formData);

      if ("error" in data) {
        dispatch(setToast({ message: data.error, type: "error" }));
      }

      if ("message" in data) {
        setTimeout(() => {
          dispatch(setToast({ message: data.message, type: "success" }));
          dispatch(setAuth({
            id: data.user.id,
            name: data.user.name,
            imageUrl: data.user.imageUrl,
          }));
          dispatch(setUploadingImage({ imageId: Date.now().toString(), loading: false }));
        }, 2000);
      }

      setTimeout(() => {
        dispatch(setToast({ message: "", type: "info" }));
        setImageFieldKey(Date.now().toString());
      }, 3000);
    },
  });

  return (
    <form
      className="w-full mb-10"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-10">
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
              className={clsx(
                `block w-full h-10 rounded-md px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { "border-2 border-red-500": formik.touched.name && formik.errors.name }
              )}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.name}</p>
            )}
          </section>
          {/* Job Title */}
          <section className="mb-5">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Job title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              className={clsx(
                `block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { "border-2 border-red-500": formik.touched.jobTitle && formik.errors.jobTitle }
              )}
            />
            {formik.errors.jobTitle && formik.touched.jobTitle && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.jobTitle}</p>
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
              className={clsx(
                `block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { "border-2 border-red-500": formik.touched.email && formik.errors.email }
              )}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.email}</p>
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
              className={clsx(
                `block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2`,
                { "border-2 border-red-500": formik.touched.course && formik.errors.course }
              )}
            />
            {formik.errors.course && formik.touched.course && (
              <p className="text-red-500 ml-1 my-3">{formik.errors.course}</p>
            )}
          </section>
        </section>
        <section>
          {/* Profile Image */}
          <section className="mb-5">
            {user.imageUrl && (
              (!loadingImage) ? (
                <Image
                  key={imageId}
                  className="object-cover object-top max-w-lg w-full h-auto shadow-lg border rounded-lg p-3 mb-5"
                  src={user.imageUrl}
                  alt={user.name}
                  width={500}
                  height={500}
                  priority
                />
              ): (
                <ImageSkeleton className="border-2 size-[500px] border-gray-200 mb-5" />
              )
            )}

            {!user.imageUrl && <UserIcon className="text-slate-200 w-[225px] mb-10" />}

            <input
              key={imageFieldKey}
              id="userImage"
              type="file"
              name="image"
              className="mb-5"
              onChange={(event) => {
                return formik.setFieldValue("image", event.target.files![0]);
              }}
            />
          </section>
        </section>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-10">
        <section>
          {/* Start Date */}
          <section className="mb-5">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={ new Date(formik.values.startDate!).toISOString().split("T")[0] }
              onChange={formik.handleChange}
              className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
          </section>
          {/* End Date */}
          <section className="mb-5">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={ new Date(formik.values.endDate!).toISOString().split("T")[0] }
              onChange={formik.handleChange}
              className="block w-full h-10 rounded-md border-0 px-4 py-1.5 lg:mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
          </section>
        </section>
        <section>
          {/* Status */}
          <section className="flex gap-x-2 items-center mb-5">
            <input
              id="active"
              type="checkbox"
              name="active"
              className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
              value={1}
              checked={Boolean(formik.values.active)}
              onChange={formik.handleChange}
            />
            <label htmlFor="active" className="font-medium text-gray-900">
              Active
            </label>
          </section>
          {/* Schedule*/}
          <section className="mb-10 lg:mb-5">
            <label
              htmlFor="schedule"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Schedule
            </label>
            <select
              id="schedule"
              name="schedule"
              className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              defaultValue={formik.values.schedule}
              onChange={formik.handleChange}
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
          className="flex w-full md:w-[150px] h-14 md:h-auto justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg md:text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >update</button>
      </section>
    </form>
  );
};

export default UpdateUserForm;
