"use client";

import { FC, useState } from "react";
import { UserIcon } from "./icons";

type Props = {
    user: {
        id: string;
        name: string;
        email: string;
        type?: "student" | "client" | "admin";
        jobTitle: string;
        active?: boolean;
        course: string;
        schedule: "morning" | "afternoon" | "evening";
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
    };
};

export const ProfileBody: FC<Props> = ({ user }) => {
    console.log(user);

    const [formData, setFormData] = useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        type: user ? user.type : "student",
        jobTitle: user ? user.jobTitle : "",
        active: user ? user.active : false,
        course: user ? user.course : "",
        schedule: user ? user.schedule : "morning",
        startDate: user ? user.startDate : "",
        endDate: user ? user.endDate : "",
    });

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="w-[80%] mx-auto py-10">
            <h1 className="text-6xl text-slate-700 font-semibold tracking-tight mb-10">
                User Profile
            </h1>

            <h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-5">
                Account Details
            </h2>

            <hr className="border-b-1 w-full mb-10" />

            <form
                className="w-full mb-10"
                action={() => console.log("Save User details")}
            >
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
                                value={formData.name}
                                onChange={onInputChange}
                                className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            />
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
                                value={formData.jobTitle}
                                onChange={onInputChange}
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
                                value={formData.email}
                                onChange={onInputChange}
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
                                value={formData.course}
                                onChange={onInputChange}
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
                                value={
                                    new Date(formData.startDate)
                                        .toISOString()
                                        .split("T")[0]
                                }
                                onChange={onInputChange}
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
                                value={
                                    new Date(formData.endDate)
                                        .toISOString()
                                        .split("T")[0]
                                }
                                onChange={onInputChange}
                                className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            />
                        </section>
                    </section>

                    <section>
                        {/* Status */}
                        <section className="mb-5">
                            <label
                                htmlFor="active"
                                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                            >
                                Status
                            </label>
                            <select
                                id="active"
                                className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                value={formData.active ? "true" : "false"}
                                onChange={onInputChange}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </section>

                        {/* Schedule*/}
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
                                value={formData.schedule}
                                onChange={onInputChange}
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
                        update
                    </button>
                </section>
            </form>

            <hr className="border-b-1 w-full my-10" />

            <h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-5">
                Update Password
            </h2>

            <hr className="border-b-1 w-full mb-10" />

            <form
                className="w-full mb-10"
                action={() => console.log("changing password ...")}
            >
                <section className="grid grid-cols-2 w-full gap-10">
                    <section className="mb-5">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-5"
                        >
                            New Password
                        </label>
                        <input
                            className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            id="password"
                            type="password"
                            defaultValue=""
                            onChange={() => {}}
                        />
                    </section>

                    <section className="mb-5">
                        <label
                            htmlFor="password-confirmation"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-5"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                            name="passwordConfirmation"
                            id="password-confirmation"
                            type="password"
                            onChange={() => {}}
                        />
                    </section>
                </section>

                <section className="w-full flex justify-start md:justify-end">
                    <button
                        type="submit"
                        className="flex w-full md:w-[150px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        update
                    </button>
                </section>
            </form>

            <hr className="border-b-1 w-full mb-10" />

            <h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-10">
                Membership
            </h2>

            <form action={() => console.log("Upgrading account ...")}>
                <section className="grid grid-cols-2">
                    <section className="flex gap-3 items-center">
                        <h3 className="text-3xl text-slate-500 font-semibold tracking-tight">
                            Current Plan
                        </h3>
                        <div className=" bg-gray-200 text-lg text-slate-900 w-fit px-5 py-2 rounded">
                            free plan
                        </div>
                    </section>
                    <section>
                        <button
                            type="submit"
                            className="flex w-fit justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            upgrade to premium
                        </button>
                    </section>
                </section>
            </form>

            <hr className="border-b-1 w-full my-10" />

            <section className="grid grid-cols-2">
                <h2 className="text-4xl text-red-500 font-semibold tracking-tight mb-10">
                    Delete Account
                </h2>

                <form
                    action={() => console.log("deleting account ...")}
                    className="w-full"
                >
                    <section className="w-full">
                        <button
                            type="submit"
                            className="flex w-full md:w-[150px] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            delete
                        </button>
                    </section>
                </form>
            </section>
        </section>
    );
};

export default ProfileBody;
