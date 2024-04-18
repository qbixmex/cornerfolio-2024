'use client';

import { useEffect, useState } from 'react';
import { portFoliosFetch } from '@/api/portfolios.fetch';
import { Portfolio } from './portfolioManagementActions';
import { User } from '@/interfaces';
import { UserIcon } from './icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/login/actions/logout.action';
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { resetToast, setToast } from '@/store/slices/toast.slice';
import { useAppSelector } from '@/store';
import { resetAuth, setAuth } from '@/store/slices/auth.slice';

type Props = {
	authenticatedUser: User;
};

const TopNavigation: React.FC<Props> = ({ authenticatedUser }) => {
	const dispatch = useDispatch();
	const { imageId } = useAppSelector((state) => state.imageUpload);
	const { user } = useAppSelector((state) => state.auth);
	const pathname = usePathname();
	const router = useRouter();
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	const [centerMenuOpen, setCenterMenuOpen] = useState(false);
	const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

	useEffect(() => {
		dispatch(setAuth(authenticatedUser));
	}, [imageId]);

	const fetchDataForPortfolio = async () => {
		const data = await portFoliosFetch();
		setPortfolios(data);
	};

	const toggleCenterMenu = () => {
		fetchDataForPortfolio();
		setCenterMenuOpen(!centerMenuOpen);
	};

	const toggleRightMenu = () => {
		setRightMenuOpen(!rightMenuOpen);
	};

	const handleLogout = () => {
		dispatch(setToast({ message: 'You\'ve been logged out successfully 👍', type: 'success' }))
		dispatch(resetAuth());
		logout();
		router.refresh();
		router.push('/login');
	};

	return (
		<header className="fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between border-b border-gray-200 bg-blue-700 p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl asideOpen">
					<i className="bx bx-menu"></i>
				</button>
				<div className="font-bold text-white">Cornerfolio</div>
			</div>

			<div
				className="h-[300px] flex items-center justify-center"
				onMouseLeave={() => setCenterMenuOpen(false)}
			>
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

						{portfolios.map((portfolio: Portfolio) => (
							<a
								key={portfolio.id}
								href={`/admin/portfolios/${portfolio.id}`}
								className="text-white text-sm block p-5 px-4 py-2 hover:bg-blue-300 active:bg-blue-100 cursor-pointer rounded-md"
							>
								{portfolio.portfolioTitle}
							</a>
						))}
					</div>
				</div>
			</div>

			<div>
				<button
					type="button"
					className="overflow-hidden flex justify-center items-center gap-x-2"
					onClick={toggleRightMenu}
				>
					<span className="text-white font-medium">{user?.name}</span>
					{
						(!user?.imageUrl)
							? <UserIcon className="w-10 h-10 text-gray-300 rounded-full border border-white p-2" />
							: (
								<img
									className="w-10 h-10 rounded-full border border-white p-1 object-cover object-top"
									src={user.imageUrl}
									alt={user.name}
								/>
							)
					}
				</button>

				<div
					className={`${
						rightMenuOpen ? "" : "hidden"
					} absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md`}
					x-show="profileOpen"
					x-transition="true"
				>
					<div className="flex flex-col space-y-3 p-2 text-md">
						{
							pathname !== `/admin/users/profile/${user?.id}` ? (
								<Link
									href={`/admin/users/profile/${user?.id}`}
									className="transition text-slate-700 hover:text-blue-400"
									onClick={toggleRightMenu}
								>show profile</Link>
							) : (
								<span className="text-gray-300 cursor-not-allowed">show profile</span>
							)
						}
					</div>

					<div className="flex items-center gap-x-2 p-2 ">
						<MdLogout size={20} />
						<button
							onClick={handleLogout}
							className="hover:text-blue-600 transition"
						>logout</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TopNavigation;
