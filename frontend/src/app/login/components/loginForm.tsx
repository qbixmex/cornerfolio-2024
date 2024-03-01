"use client";

import { checkLoginInfo } from "@/app/login/components/server_actions/checkLoginInfo";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type FormData = {
	email: string;
	password: string;
};

const FORM_DATA: FormData = {
	email: "",
	password: "",
};

export function LoginForm() {
	const [formData, setFormData] = useState<FormData>(FORM_DATA);
	const { email, password } = formData;

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const [error, setError] = useState<string | null>();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const togglePasswordVisibility = () => {
		if (!showPassword) {
			setShowPassword(true);
		} else {
			setShowPassword(false);
		}
	};

	// if(users) {}
	// const matchedUser = users.find((user) => user.email === email && user.password === password);

	// if (credentials) {
	//     router.push("/");
	// } else {
	//     const userWithEmail = data.find((user) => user.email === email);
	// if (userWithEmail) {
	//     setError("Your password is incorrect");
	// } else {
	//     setError(credentials.error);
	// }

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
			{error !== null}
			<p>{error}</p>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Login
				</h1>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" action={checkLoginInfo}>
					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="off"
								value={email}
								onChange={onInputChange}
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							/>
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
								value={password}
								onChange={onInputChange}
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							/>
							<div className="flex justify-end">
								<button
									type="submit"
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
