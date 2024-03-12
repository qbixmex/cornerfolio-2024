'use client';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Pagination } from '../interfaces/users';
import { getUsersList } from '../helpers';
import Link from 'next/link';

type Props = {
  pagination: Pagination;
};

const UsersPagination: React.FC<Props> = ({ pagination }) => {
  return (
    <section className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
      <span className="text-xs xs:text-sm text-gray-900">
        {pagination.page} - {Math.floor(pagination.total / pagination.limit) + 1} of {pagination.total} Entries
      </span>
      <section className="flex gap-x-2 mt-2 xs:mt-0">
        <section>
          {pagination.previous ? (
              <Link
                href={`?page=${pagination.page - 1}`}
                type="button"
                className="text-xl transition duration-150 text-indigo-50 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-md"
                onClick={async () => await getUsersList({ page: pagination.page - 1 })}
              ><FaAngleLeft /></Link>
            ): (
              <div className="text-xl transition duration-150 text-gray-400 bg-gray-200 hover:bg-none cursor-not-allowed font-semibold py-2 px-4 rounded-md"
              ><FaAngleLeft /></div>
            )
          }
        </section>
        <section>
          {pagination.next ? (
              <Link
                href={`?page=${pagination.page + 1}`}
                type="button"
                // disabled={!pagination.next}
                className="text-xl transition duration-150 text-indigo-50 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-md"
                onClick={async () => await getUsersList({ page: pagination.page + 1 })}
              ><FaAngleRight /></Link>
            ) : (
              <div className="text-xl transition duration-150 text-gray-400 bg-gray-200 hover:bg-none cursor-not-allowed font-semibold py-2 px-4 rounded-md"
              ><FaAngleRight /></div>
            )
          }
        </section>
      </section>
    </section>
  );
};

export default UsersPagination;
