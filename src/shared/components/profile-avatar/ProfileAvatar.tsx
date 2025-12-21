import { useState, type FC } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import style from "./ProfileAvatar.module.scss";
import classNames from "classnames";
import type { FullUserDataInterface } from "../../types/UI.types";
import { useSession } from "../../../context/useSession";
import { useParams } from "react-router";
import { useFollow } from "../../hooks/mutations/useFollow";
import { useIsFollowing } from "../../hooks/queries/useIsFollowing";
import { useUnfollow } from "../../hooks/mutations/useUnfollow";
import Drawer from "../drawer/Drawer";
import ButtonSimple from "../../ui/button-simple/ButtonSimple";
import ProfileDetails from "../profile-details/ProfileDetails";

const ProfileAvatar: FC<{ userData: FullUserDataInterface }> = ({
  userData,
}) => {
  const { t } = useTranslation("userProfile");
  const [showUnfollowPopup, setShowUnfollowPopup] = useState(false);
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
    is_private,
  } = userData || {};

  const isFollowing = useIsFollowing(userId, token);
  const isOwnProfile = userId === user?.id;

  const mutationFollow = useFollow({
    userId: userId || "",
    token: token || "",
  });

  const mutateUnfollow = useUnfollow({
    userId: userId || "",
    token: token || "",
  });

  const handleFollowClick = () => {
    if (isFollowing.data) {
      setShowUnfollowPopup(true);
      return;
    }
    mutationFollow.mutate();
  };

  const handleUnfollowConfirm = () => {
    mutateUnfollow.mutate();
    setShowUnfollowPopup(false);
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
              disabled={mutationFollow.isPending}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {isFollowing.data ? t("unfollow") : t("follow")}
            </motion.button>
          )}
        </div>
      </div>
      {is_private && <ProfileDetails userData={userData} />}

      <ul className={style.statsSection}>
        <li className={style.statItem}>
          <span>{t("recipes")}</span>
          <span>{recipes_count}</span>
        </li>
        <li className={style.statItem}>
          <span>{t("followers")}</span>
          <span>{followers_count}</span>
        </li>
        <li className={style.statItem}>
          <span>{t("following")}</span>
          <span>{following_count}</span>
        </li>
        <li className={style.statItem}>
          <span>{t("likes")}</span>
          <span>{likes_received}</span>
        </li>
      </ul>
      <Drawer
        direction="bottom"
        isOpen={showUnfollowPopup}
        onClose={() => setShowUnfollowPopup(false)}
      >
        <h3>{t("confirmUnfollow")}</h3>
        <p>{t("confirmUnfollowText", { username })}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <ButtonSimple onClick={() => setShowUnfollowPopup(false)}>
            {t("no")}
          </ButtonSimple>
          <ButtonSimple isActive={true} onClick={handleUnfollowConfirm}>
            {t("yes")}
          </ButtonSimple>
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileAvatar;
