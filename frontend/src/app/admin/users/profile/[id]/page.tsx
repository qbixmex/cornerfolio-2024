import ProfileBody from "@/components/profile";
import { getUser } from "@/users/actions/user.actions";
import { FC } from "react";

type Props = {
    params: { id: string };
};

const ProfilePage: FC<Props> = async ({ params }) => {
    const userInfo = await getUser(params.id);

    return <ProfileBody user={userInfo.user} />;
};

export default ProfilePage;
