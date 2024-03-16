'use client';

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchUsers = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term)  {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.replace(`${pathName}?${params.toString()}`);
  }, 400);

  return (
    <section className="flex gap-x-2 bg-gray-50 items-center p-2 rounded-md">
      <FaMagnifyingGlass className="h-4 w-4 text-gray-400" />
      <input
        className="bg-gray-50 outline-none ml-1 block w-[300px] text-gray-500"
        type="text"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="search ..."
      />
    </section>
  );
};

export default SearchUsers;
