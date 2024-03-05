'use client';

import { FC } from 'react';
import Link from 'next/link';
import { UsersList } from '../interfaces/users';
import { UserIcon } from '@/components/icons';

type Props = {
  usersList: UsersList;
};

const UsersListTable: FC<Props> = ({ usersList }) => {

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center justify-between w-full">
          {/* Search */}
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block w-[200px]"
              type="text"
              name=""
              placeholder="search..."
            />
          </div>
          <div className="ml-auto">
            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              Create
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Profile
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersList.users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-12 h-12">
                          <UserIcon className="bg-gray-200 w-full h-full p-2 text-gray-500 rounded-full" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-nowrap">
                        {user.startDate ?? 'not set'}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-nowrap">
                        {user.endDate ?? 'not set'}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`px-3 py-1 ${user.active ? 'text-green-900 bg-green-300' : 'text-gray-900 bg-gray-200'} rounded-full`}>
                        {user.active ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button className="bg-purple-300 px-4 py-2 rounded-md text-purple-800 font-semibold tracking-wide cursor-pointer">
                        {user.type}
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link href={`/users/profile/${user.id}`} className="bg-sky-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                        Show
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {usersList.pagination.page} to {usersList.pagination.limit} of {usersList.pagination.total} Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  disabled={!usersList.pagination.previous}
                  className={`text-sm transition duration-150 ${usersList.pagination.previous ? 'text-indigo-50 hover:bg-indigo-500 bg-indigo-600' : 'text-gray-400 bg-gray-200 hover:bg-none cursor-not-allowed'} font-semibold py-2 px-4 rounded-l`}
                >
                  Prev
                </button>
                &nbsp; &nbsp;
                <button
                  disabled={!usersList.pagination.next}
                  className={`text-sm transition duration-150 ${usersList.pagination.next ? 'text-indigo-50 hover:bg-indigo-500 bg-indigo-600' : 'text-gray-400 bg-gray-200 hover:bg-none cursor-not-allowed'} font-semibold py-2 px-4 rounded-r`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListTable;