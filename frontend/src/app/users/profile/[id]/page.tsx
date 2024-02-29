const Profile = () => {
    return (
        <div className="hidden space-y-6 px-36 py-10 pb-16 md:block bg-white">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            </div>
            <div className="shrink-0 border-b-2 w-[100%]" />
            <div className="flex flex-col space-y-8 w-[100%]">
                <div className="flex justify-between w-full">
                    <div className="w-[100%]">
                        <h2 className="text-lg font-bold tracking-tight">
                            Profile
                        </h2>
                        <p>Basic information</p>
                    </div>
                    <form className="w-[100%]">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                        <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Job title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="block w-full h-10 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                        <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Contact email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                        <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />

                        <label
                            htmlFor="userImage"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            User image
                        </label>
                        <input
                            type="file"
                            id="userImage"
                            style={{ display: "none" }}
                        />
                        <button
                            type="submit"
                            className="flex w-[20%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 mb-12 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Upload
                        </button>
                        <button
                            type="submit"
                            className="flex w-[20%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </form>
                </div>
                <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />
                <div className="flex justify-between w-full">
                    <div className="w-[100%]">
                        <h2 className="text-lg font-bold tracking-tight">
                            Account
                        </h2>
                        <p>Account details and your data</p>
                    </div>
                    <form className="w-[100%]">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Login email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                        <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />
                        <div className="flex justify-between">
                            <div className="flex flex-col w-[45%]">
                                <label
                                    htmlFor="new"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    New password
                                </label>
                                <input
                                    id="new"
                                    name="new"
                                    type="new"
                                    className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                            <div className="flex flex-col w-[45%]">
                                <label
                                    htmlFor="confirm"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <input
                                    id="confirm"
                                    name="confirm"
                                    type="confirm"
                                    className="block w-full h-10 rounded-md border-0 px-4 py-1.5 mb-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex w-[20%] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </form>
                </div>
                <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />
                <div className="flex justify-between w-full">
                    <div className="w-[100%]">
                        <h2 className="text-lg font-bold tracking-tight">
                            Plan
                        </h2>
                        <p>Current plan</p>
                    </div>
                    <div className="w-[100%]">
                        <h3>Current plan</h3>
                        <div>Free plan</div>
                        <button
                            type="submit"
                            className="flex w-[35%] justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Upgrade to premium
                        </button>
                    </div>
                </div>
                <div className="shrink-0 border-b-[1px] w-[100%] mt-8 mb-6" />
                <div className="flex justify-between w-full">
                    <h2 className="w-[100%] text-lg font-bold tracking-tight">
                        Delete account
                    </h2>
                    <div className="w-[100%]">
                        <button
                            type="submit"
                            className="flex w-[20%] justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
