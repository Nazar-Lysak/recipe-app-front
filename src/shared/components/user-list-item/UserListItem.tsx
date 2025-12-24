import { Link } from "react-router";
import ButtonSimple from "../../ui/button-simple/ButtonSimple";
import type { FollowerInterface } from "../../types/UI.types";

import style from "./UserListItem.module.scss";
import { useSession } from "../../../context/useSession";
import { useFollow } from "../../hooks/mutations/useFollow";
import { useUnfollow } from "../../hooks/mutations/useUnfollow";

interface UserListItemProps {
  profile: {
    id: string;
    avatar_url: string;
    user: {
      username: string;
      email: string;
      id: string;
    };
    followers?: FollowerInterface[];
  };
}

const UserListItem = ({ profile }: UserListItemProps) => {
  const { user, token } = useSession();
  const mutationFollow = useFollow({
    userId: profile.user.id,
    token: token!,
  });
  const mutationUnfollow = useUnfollow({
    userId: profile.user.id,
    token: token!,
  });

  const isOwnProfile = profile.user.id === user?.id;
  if (isOwnProfile) {
    return null;
  }

  const isFollowing = profile?.followers?.some(
    (follower) => follower.followerId === user?.id,
  );

  const handleSubscribe = () => {
    if (!isFollowing) {
      mutationFollow.mutate();
      return;
    }

    mutationUnfollow.mutate();
  };

  return (
    <div className={style.userListItem}>
      <Link to={`/user/${profile.user.id}`} className={style.userLink}>
        <img
          className={style.avatar}
          src={profile.avatar_url}
          alt={profile.user.username}
        />
        <div className={style.userInfo}>
          <p className={style.username}>{profile.user.username}</p>
          <p className={style.email}>{profile.user.email}</p>
        </div>
      </Link>
      <ButtonSimple isActive={isFollowing} onClick={handleSubscribe}>
        {isFollowing ? "Відписатися" : "Підписатися"}
      </ButtonSimple>
    </div>
  );
};

export default UserListItem;
