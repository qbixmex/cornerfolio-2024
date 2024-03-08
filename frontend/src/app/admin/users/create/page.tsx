import { CreateUserForm } from "@/users/components";

const CreateUserPage = () => {
  return (
    <section className="w-[80%] mx-auto py-10">
      <h1 className="text-6xl text-slate-600 font-semibold mb-10">
        Create New User
      </h1>

      <CreateUserForm />

    </section>
  );
};

export default CreateUserPage;
