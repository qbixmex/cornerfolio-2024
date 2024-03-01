"use client";

import { ErrorState, getUserData } from "@/api/register.fetch";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ErrorMessage from "./errorMessage";

type FormData = {
	name: string;
	password: string;
	confirmPassword: string;
};

const FORM_DATA: FormData = {
	name: "",
	password: "",
	confirmPassword: "",
};

export function SignUpForm() {
	const [error, setError] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [formData, setFormData] = useState<FormData>(FORM_DATA);
	const [state, formAction] = useFormState<ErrorState, globalThis.FormData>(getUserData, {});

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		if (state.error) {
			setErrorMessage(state.error);
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
		}
	}, [state]);

	const { name, password, confirmPassword } = formData;

	const validateConfirmPassword = () => {
		if (password !== confirmPassword) {
			setError("Your passwords are not matching, please check again");
		} else {
			setError(null);
		}
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
			<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Register New Account
			</h2>
			{errorMessage && <ErrorMessage message={errorMessage} />}
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" action={formAction}>
					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Name User:</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={onInputChange}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
						<input
							type="text"
							name="email"
							autoComplete="off"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={onInputChange}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Confirm Password:
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={confirmPassword}
							onChange={onInputChange}
							onBlur={validateConfirmPassword}
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
						{error && (
							<div
								className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<p className="font-bold">Error:</p>
								<p className="text-sm">{error}</p>
							</div>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							What is your Job Title?
						</label>
						<input
							type="text"
							name="job"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							In which Class are you enrolled?
						</label>
						<input
							type="text"
							name="class"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
							autoComplete="off"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Select one of these schedule hour:
						</label>
						<select
							name="schedule"
							id=""
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
						disabled={!!error}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Create Profile
					</button>
				</form>
			</div>
		</div>
	);
}
