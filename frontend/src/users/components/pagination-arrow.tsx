'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
};

const PaginationArrow: React.FC<Props> = ({ href, direction, isDisabled }) => {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'text-gray-300 cursor-not-allowed': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon = (direction === 'left') ? (
    <FaChevronLeft className="w-4" />
  ) : (
    <FaChevronRight className="w-4" />
  );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
};

export default PaginationArrow;
