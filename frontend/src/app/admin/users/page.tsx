import Link from 'next/link';
import { getUsersPages } from '@/users';
import { SearchUsers, Pagination, UsersTableSkeleton } from '@/users/components';
import UsersTable from '@/users/components/users-table';
import { Suspense } from 'react';

export const metadata = {
  title: "Users List",
  description: "Users List page",
};

type Props = {
  params: {};
  searchParams: {
    query?: string;
    page?: string;
  };
};

const UsersPage: React.FC<Props> = async ({ searchParams }) => {

  const { query = '', page: currentPage = '1' } = searchParams;
  const data = await getUsersPages(query);

  return (
    <section className="w-[90%] mx-auto py-10">
      <h1 className="text-6xl text-slate-700 font-semibold pl-8 mb-10">
        Users List
      </h1>

      <div className="bg-white p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center justify-between w-full">
            {/* Search */}
            <SearchUsers />

            <div className="ml-auto">
              <Link
                href="/admin/users/create"
                className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                Create
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
                <UsersTable query={query} currentPage={+currentPage} />
              </Suspense>
            </div>

           { data.total && <Pagination totalPages={data.total} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
