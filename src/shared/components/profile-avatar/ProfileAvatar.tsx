import type { FC } from "react";
import { motion } from "framer-motion";
import style from "./ProfileAvatar.module.scss";
import classNames from "classnames";
import type { FullUserDataInterface } from "../../types/UI.types";
import { useSession } from "../../../context/useSession";
import { useParams } from "react-router";
import { useFollow } from "../../hooks/mutations/useFollow";
import { useIsFollowing } from "../../hooks/queries/useIsFollowing";

const ProfileAvatar: FC<{ userData: FullUserDataInterface }> = ({
  userData,
}) => {
  const { user, token } = useSession();
  const userId = useParams().userId;

  const {
    username,
    email,
    bio,
    avatar_url,
    recipes_count,
    likes_received,
    followers_count,
    following_count,
  } = userData || {};

  const isFollowing = useIsFollowing(userId, token);

  const isOwnProfile = userId === user?.id;

  const mutation = useFollow({
    userId: userId || "",
    token: token || "",
    isFollowing: isFollowing.data || false,
  });

  const handleFollowClick = () => {
    if (isFollowing.data) {
      console.log("Unfollow user");
      return;
    }

    mutation.mutate();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.topSection}>
        <img src={avatar_url || ""} alt={username} className={style.avatar} />
        <div className={style.userInfo}>
          <h3 className={style.username}>{username}</h3>
          <p className={style.bio}>{bio ? bio : email}</p>
          {!isOwnProfile && (
            <motion.button
              className={classNames({
                [style.followButton]: true,
                [style.following]: isFollowing.data,
              })}
              onClick={handleFollowClick}
              disabled={mutation.isPending}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {isFollowing.data ? "Відписатись" : "Підписатиись"}
            </motion.button>
          )}
        </div>
      </div>
      <ul className={style.statsSection}>
        <li className={style.statItem}>
          <span>Рецепти</span>
          <span>{recipes_count}</span>
        </li>
        <li className={style.statItem}>
          <span>Підписники</span>
          <span>{followers_count}</span>
        </li>
        <li className={style.statItem}>
          <span>Підписки</span>
          <span>{following_count}</span>
        </li>
        <li className={style.statItem}>
          <span>Вподобання</span>
          <span>{likes_received}</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileAvatar;
