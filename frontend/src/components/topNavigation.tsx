'use client';

import { useState } from 'react';

const TopNavigation = () => {
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	const [centerMenuOpen, setCenterMenuOpen] = useState(false);

	//* Get login User from redux?
	const [loginUser, setLoginUser] = useState({
		id: 1,
		name: "Taisei Yamaguchi",
		email: "aries0326taisei@gmail.com",
		type: "student",
		course: "Web development",
		schedule: "afternoon",
		portfolios: [],
		jobTitle: "Web Engineer",
		img: "https://avatars.githubusercontent.com/u/119865966?v=4",
	});

	const toggleCenterMenu = () => {
		setCenterMenuOpen(!centerMenuOpen);
	};
	const toggleRightMenu = () => {
		setRightMenuOpen(!rightMenuOpen);
	};

	return (
		<header className="fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between border-b border-gray-200 bg-blue-700 p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl asideOpen">
					<i className="bx bx-menu"></i>
				</button>
				<div className="font-bold text-white">Cornerfolio</div>
			</div>

			<div className="h-[300px] flex items-center justify-center">
				<div className="relative group">
					<button
						id="dropdown-button"
						className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-blue-500 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
						onClick={toggleCenterMenu}
					>
						<span className="h-2 text-white">Portfolios</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5 ml-2 -mr-1"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								clipRule="evenodd"
								d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							/>
						</svg>
					</button>

					<div
						id="dropdown-menu"
						className={`${
							centerMenuOpen ? "" : "hidden"
						} absolute right-0 mt-2 rounded-md shadow-lg bg-blue-500 ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
					>
						<a
							href="/admin/portfolio-management"
							className="text-white text-sm block p-5 px-z py-2 hover:bg-blue-300 active:bg-blue-100 cursor-pointer rounded-md"
						>
							Manage Portfolios
						</a>
						<a
							href="#"
							className="text-white text-sm block p-5 px-4 py-2 hover:bg-blue-300 active:bg-blue-100 cursor-pointer rounded-md"
						>
							Yours
						</a>
					</div>
				</div>
			</div>

			<div>
				<button
					type="button"
					className="h-8 w-8 overflow-hidden rounded-full"
					onClick={toggleRightMenu}
				>
					<img src={loginUser.img} alt={loginUser.name} />
				</button>

				<div
					className={`${
						rightMenuOpen ? "" : "hidden"
					} absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md`}
					x-show="profileOpen"
					x-transition="true"
				>
					<div className="flex items-center space-x-2 p-2">
						<img src={loginUser.img} alt={loginUser.name} className="h-9 w-9 rounded-full" />
						<div className="font-medium">{loginUser.name}</div>
					</div>

					<div className="flex flex-col space-y-3 p-2">
						<a href="#" className="text-sm transition hover:text-blue-600">
							My Profile
						</a>
						<a href="#" className="text-sm transition hover:text-blue-600">
							Settings
						</a>
						<a href="../login" className="text-sm transition hover:text-blue-600">
							Login
						</a>
						<a href="../register" className="text-sm transition hover:text-blue-600">
							Register
						</a>
					</div>

					<div className="p-2">
						<button className="flex items-center space-x-2 transition hover:text-blue-600">
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								></path>
							</svg>
							<div>Log Out</div>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TopNavigation;
