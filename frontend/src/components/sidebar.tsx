'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUsers } from 'react-icons/fa';
import { UserIcon } from './icons';
import { logout } from '@/app/login/actions/logout.action';
import { useRouter } from 'next/navigation';
import { AuthenticatedUser } from '@/interfaces';
import { MdLogout } from "react-icons/md";

const sidebarLink =
  "bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600";
const sidebarLinkActive =
  "relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white";

type Props = {
  authenticatedUser?: AuthenticatedUser;
};

const Sidebar: React.FC<Props> = ({ authenticatedUser }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
		logout();
    router.refresh();
		router.push('/login');
	};

  return (
    <div className="fixed z-40 left-0 top-5 sidebar h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg">
      <div className="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <ul className="mt-6 space-y-2 tracking-wide">
            <li className="min-w-max">
              <Link
                href="/admin/portfolio-management"
                className={
                  pathname !== "/admin/portfolio-management"
                    ? sidebarLink
                    : sidebarLinkActive
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    className="fill-current text-gray-300 group-hover:text-cyan-300"
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                    clipRule="evenodd"
                  />
                  <path
                    className="fill-current text-gray-600 group-hover:text-cyan-600"
                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                  />
                </svg>
                <span className="group-hover:text-gray-700">
                  Manage Portfolios
                </span>
              </Link>
            </li>
            <li className="min-w-max">
              <Link
                href={`/admin/users/profile/${authenticatedUser?.id}`}
                className={pathname !== "/" ? sidebarLink : sidebarLinkActive}
              >
                <div className="avatar">
                  <div className="w-5 h-5">
                    <UserIcon size={20} />{" "}
                  </div>
                </div>
                <span className="group-hover:text-gray-700">Profile</span>
              </Link>
            </li>

            <li className="min-w-max">
              <a
                href="/admin/users"
                className={
                  pathname !== "/admin/users"
                    ? sidebarLink
                    : sidebarLinkActive
                }
              >
                <div className="avatar">
                  <div className="w-5 h-5">
                    <FaUsers size={20} />
                  </div>
                </div>
                <span className="group-hover:text-gray-700">Users</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="w-max -mb-3">
          <button
            type="button"
            className="flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 hover:text-blue-600"
            onClick={handleLogout}
          >
            <MdLogout size={20} />
            <span className='group-hover:text-gray-700'>logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
