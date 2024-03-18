import Link from 'next/link';
import { convertDate } from '../helpers';
import { UserIcon } from '@/components/icons';
import { fetchUsersByQuery } from '../actions/user.actions';
import dynamic from 'next/dynamic';

type Props = {
  query: string;
};

const UsersTable: React.FC<Props> = async ({ query }) => {

  const foundUsers = await fetchUsersByQuery(query);

  if (foundUsers.users.length === 0 ) {
    const GoAlertFill = dynamic(() => import('react-icons/go').then(module => module.GoAlertFill));
    return (
      <div className="flex justify-center items-center gap-x-2 bg-amber-500 text-center text-white text-3xl rounded h-[100px]">
        <GoAlertFill /> No {foundUsers.message}
      </div>
    );
  }

  return (
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
        {foundUsers.users.map((user) => (
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
                {user.startDate
                  ? convertDate(new Date(user.startDate))
                  : "not set"}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-nowrap">
                {user.endDate
                  ? convertDate(new Date(user.endDate))
                  : "not set"}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span
                className={`px-3 py-1 ${user.active
                    ? "text-green-900 bg-green-300"
                    : "text-gray-900 bg-gray-200"
                  } rounded-full`}
              >
                {user.active ? "active" : "inactive"}
              </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button className="bg-purple-300 px-4 py-2 rounded-md text-purple-800 font-semibold tracking-wide cursor-pointer">
                {user.type}
              </button>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <Link
                href={`/admin/users/profile/${user.id}`}
                className="bg-sky-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                Show
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

};

export default UsersTable;
