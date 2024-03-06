'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const fetchUsers = (url: string) => {
  const params = new URLSearchParams(url);
  
  // revalidate the user-table tag
  revalidateTag("users-table")

  // redirect to the same page
  redirect(`/admin/users?${params.toString()}`)
};
