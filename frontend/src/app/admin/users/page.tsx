import { UsersListTable, getUsersList } from '@/users';

export const metadata = {
  title: 'Users List',
  description: 'Users List page',
};

const UsersPage = async () => {
  const usersList = await getUsersList({});

  return (
    <section className="w-[90%] mx-auto py-10">
      <h1 className="text-6xl text-slate-700 font-semibold pl-8 mb-10">
        Users List
      </h1>

      <UsersListTable usersList={usersList} />
    </section>
  );
};

export default UsersPage;
