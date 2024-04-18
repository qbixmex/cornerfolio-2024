import { FC } from "react";
import { getUser } from "@/users/actions/user.actions";
import { ProfileBody } from "@/users/components";
import NotFoundUser from "@/users/components/not-found-user";

type Props = {
	params: { id: string };
};

const ProfilePage: FC<Props> = async ({ params }) => {
	const data = await getUser(params.id);

	return (
		<>
			{
				('error' in data)
					? <NotFoundUser  message={data.error}/>
					: <ProfileBody user={data.user} />
			}
		</>
	);
};

export default ProfilePage;
