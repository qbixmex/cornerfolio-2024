import { UsersList } from '../interfaces/users';

type Options = {
  page?: number;
  limit?: number;
  order?: string;
  orderBy?: string;
};

export const getUsersList = async (options?: Options): Promise<UsersList> => {

  const API_URL = process.env.API_URL;

  const URL = `${API_URL}/api/users`
    + `?page=${options?.page ?? 1}`
    + `&limit=${options?.limit ?? 10}`
    + `&orderBy=${options?.orderBy ?? 'name'}`
    + `&order=${options?.order ?? 'asc'}`;

    const response = await fetch(URL);
  return response.json();
};
