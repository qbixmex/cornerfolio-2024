'use client';

import { generatePagination, getUsersList } from '../helpers';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { PaginationArrow, PaginationNumber } from '.';

type Props = {
  totalPages: number;
};

const Pagination: React.FC<Props> = ({ totalPages }) => {

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pathname = usePathname();

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <section className="flex justify-center items-center mt-10">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <section className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </section>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </section>
  );
};

export default Pagination;
