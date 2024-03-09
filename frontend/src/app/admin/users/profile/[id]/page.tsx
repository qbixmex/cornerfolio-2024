import { FC } from "react";
import { getUser } from "@/users/actions/user.actions";
import { ProfileBody } from "@/users/components";

type Props = {
	params: { id: string };
};

const ProfilePage: FC<Props> = async ({ params }) => {
	const userInfo = await getUser(params.id);
	return (
		<ProfileBody user={userInfo.user} />
	);
};

export default ProfilePage;
