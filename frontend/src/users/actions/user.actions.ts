export const getUser = async (id: string) => {
    const response = await fetch(`http://localhost:4000/api/users/${id}`);

    return response.json();
};
