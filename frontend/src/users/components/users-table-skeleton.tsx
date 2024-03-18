import { UserIcon } from "@/components/icons";

const UsersTableSkeleton = () => {
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
        {[1, 2, 3, 4, 5].map((user) => (
          <tr key={user} className="animate-[pulse_1s_ease-in-out_infinite]">
            <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12">
                  <UserIcon className="bg-gray-200 w-full h-full p-2 text-gray-500 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="w-[100px] h-[20px] rounded bg-gray-200"></div>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white">
              <div className="w-[100px] h-[20px] rounded bg-gray-200"></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white">
              <div className="w-[100px] h-[20px] rounded bg-gray-200"></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white">
              <div className="w-[100px] h-[20px] rounded bg-gray-200"></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white">
              <div className={`bg-gray-200 w-[50px] h-[20px] rounded`}></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white">
              <div className="w-[80px] h-[20px] bg-gray-200 rounded-md"></div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white">
              <div className="w-[80px] h-[20px] bg-gray-200 rounded-md"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTableSkeleton;