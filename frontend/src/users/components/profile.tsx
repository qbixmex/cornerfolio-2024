'use client';

import { useEffect, useState } from 'react';
import styles from './profile.module.css'
import { UserResponse } from '../interfaces/users';
import UpdateUserForm from './update/update-form';
import PasswordForm from './update/update-password-form';
import DeleteAccount from './delete/delete-account';

type Props = {
	user: UserResponse;
};

const ProfileBody: React.FC<Props> = ({ user }) => {
	useEffect(() => {
		// Remove the data-theme attribute
		document.documentElement.removeAttribute('data-theme');
		// Remove the style attribute
		document.documentElement.removeAttribute('style');
	}, []);

	const [toast, setToast] = useState({
		message: '',
		type: ''
	});

	return (
		<section className="relative">
			{toast.message && (
				<div className={`fixed z-[100] top-5 right-5 w-fit bg-${toast.type === 'error' ? 'red' : 'green' }-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}>
					{toast.message}
				</div>
			)}

			<section className="w-[80%] mx-auto py-10">
				<h1 className="text-6xl text-slate-700 font-semibold tracking-tight mb-10">
					User Profile
				</h1>

				<h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-5">
					Account Details
				</h2>

				<hr className="border-b-1 w-full mb-10" />

				<UpdateUserForm user={user} setToast={setToast} />

				<hr className="border-b-1 w-full my-10" />

				<h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-5">
					Update Password
				</h2>

				<hr className="border-b-1 w-full mb-10" />

				<PasswordForm id={user.id} setToast={setToast} />

				<hr className="border-b-1 w-full mb-10" />

				<h2 className="text-4xl text-slate-700 font-semibold tracking-tight mb-10">
					Membership
				</h2>

				<form action={() => {}}>
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
					<DeleteAccount userId={user.id} />
				</section>
			</section>
		</section>
	);
};

export default ProfileBody;
