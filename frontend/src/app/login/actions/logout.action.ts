"use server";

import { cookies } from 'next/headers';

export const logout = async () => {
  const cookiesStore = cookies();
  cookiesStore.delete('token');
};