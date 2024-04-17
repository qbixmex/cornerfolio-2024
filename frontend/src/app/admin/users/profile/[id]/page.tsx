import { FC } from "react";
import { getUser } from "@/users/actions/user.actions";
import { ProfileBody } from "@/users/components";
import NotFoundUser from "@/users/components/not-found-user";

type Props = {
	params: { id: string };
};

const ProfilePage: FC<Props> = async ({ params }) => {
	const userInfo = await getUser(params.id);
	return (
		<>
			{
				!userInfo.error
					? <ProfileBody user={userInfo.user} />
					: <NotFoundUser  message={userInfo.error}/>
			}
		</>
	);
};

export default ProfilePage;
