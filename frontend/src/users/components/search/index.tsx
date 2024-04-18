'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebouncedCallback } from 'use-debounce';

const SearchUsers = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.replace(`${pathName}?${params.toString()}`);
  }, 400);

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('query');
    router.replace(`${pathName}?${params.toString()}`);
    handleSearch('');
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <section className="flex gap-x-2 bg-gray-50 items-center p-2 rounded-md">
      <input
        className="bg-gray-50 outline-none ml-1 block w-[300px] text-gray-500"
        type="text"
        name="search"
        ref={searchRef}
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Search ..."
        autoComplete="off"
      />
      {(!searchRef.current?.value) ? (
        <FaMagnifyingGlass className="h-4 w-4 text-gray-400" />
      ) : (
        <button type="button" onClick={handleClear}>
          <FaTimes className="text-gray-400" />
        </button>
      )}
    </section>
  );
};

export default SearchUsers;
