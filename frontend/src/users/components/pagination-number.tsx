'use client';

import clsx from "clsx";
import Link from "next/link";

type Props = {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
};

const PaginationNumber: React.FC<Props> = ({
  page,
  href,
  isActive,
  position,
}) => {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}



export default PaginationNumber;
