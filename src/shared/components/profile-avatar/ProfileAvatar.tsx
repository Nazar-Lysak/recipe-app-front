import { useState } from "react";
import type { FC } from "react";
import style from "./ProfileAvatar.module.scss";
import classNames from "classnames";
import type { FullUserDataInterface } from "../../types/UI.types";

const ProfileAvatar: FC<{ userData: FullUserDataInterface }> = ({
  userData,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

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

  return (
    <div className={style.wrapper}>
      <div className={style.topSection}>
        <img src={avatar_url || ""} alt={username} className={style.avatar} />
        <div className={style.userInfo}>
          <h3 className={style.username}>{username}</h3>
          <p className={style.bio}>{bio ? bio : email}</p>
          <button
            className={classNames({
              [style.followButton]: true,
              [style.following]: isFollowing,
            })}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Відписатись" : "Підписатись"}
          </button>
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
