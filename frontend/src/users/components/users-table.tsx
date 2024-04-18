import { UserIcon } from '@/components/icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { fetchUsersByQuery } from '../actions/user.actions';
import { convertDate } from '../helpers';
import Thumbnail from './thumbnail';

type Props = {
  query: string;
  currentPage: number;
};

const UsersTable: React.FC<Props> = async ({ query, currentPage }) => {

  const data = await fetchUsersByQuery(query, currentPage);

  if (data.users.length === 0) {
    const GoAlertFill = dynamic(() => import('react-icons/go').then(module => module.GoAlertFill));
    return (
      <div className="flex justify-center items-center gap-x-2 bg-amber-500 text-center text-white text-3xl rounded h-[100px]">
        <GoAlertFill /> No {data.message}
      </div>
    );
  }

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            Email
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            Start date
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            End date
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            Type
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
            Profile
          </th>
        </tr>
      </thead>
      <tbody>
        {data.users.map((user) => (
          <tr key={user.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12">
                  {
                    !user.imageUrl ? (
                      <UserIcon className="bg-gray-200 w-full h-full p-2 text-gray-500 rounded-full" />
                    ) : (
                      <Thumbnail name={user.name} imageUrl={user.imageUrl} />
                    )
                  }
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
              <div
                className={`w-20 h-8 flex justify-center items-center ${user.active
                  ? "text-green-900 bg-green-300"
                  : "text-gray-900 bg-gray-200"
                  } rounded-md`}
              >
                {user.active ? "Active" : "Inactive"}
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
              <div className="bg-purple-300 w-20 h-8 rounded-md text-purple-800 font-semibold tracking-wide flex justify-center items-center capitalize">
                {user.type}
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <Link
                href={`/admin/users/profile/${user.id}`}
              >
                <div className="w-20 h-8 bg-sky-500 rounded-md text-white font-semibold tracking-wide flex justify-center items-center">
                  Show
                </div>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

};

export default UsersTable;
