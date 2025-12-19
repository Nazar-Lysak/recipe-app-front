import MoreVerticalIcon from "../../../assets/img/svg/MoreVerticalIcon";
import { useTranslation } from "react-i18next";
import style from "./UserCard.module.scss";
import { Link } from "react-router";
import type { UserInterface } from "../../types/UI.types";
import { useState } from "react";
import { useIsFollowing } from "../../hooks/queries/useIsFollowing";
import { useSession } from "../../../context/useSession";
import ButtonSimple from "../../ui/button-simple/ButtonSimple";
import Drawer from "../drawer/Drawer";
import { useUnfollow } from "../../hooks/mutations/useUnfollow";
import { useFollow } from "../../hooks/mutations/useFollow";

interface UserCardProps {
  authorData?: UserInterface;
}

interface RecipeCardProps {
  recipe?: {
    authorId: string;
    likedByUserIds: string[];
  };
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-category-image.png";

function UserCard({
  authorData,
  recipe,
  isOwnRecipe,
}: UserCardProps & RecipeCardProps & { isOwnRecipe?: boolean }) {
  const { t } = useTranslation("userProfile");
  const [showUnfollowPopup, setShowUnfollowPopup] = useState(false);
  const { avatar_url, email, first_name, username } = authorData || {};
  const { token } = useSession();

  const isFollowing = useIsFollowing(recipe?.authorId, token);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const mutationFollow = useFollow({
    userId: recipe?.authorId || "",
    token: token || "",
  });

  const mutateUnfollow = useUnfollow({
    userId: recipe?.authorId || "",
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
      <Link to={`/user/${recipe?.authorId}`}>
        <div className={style.userInfo}>
          <img
            src={avatar_url || FALLBACK_IMAGE}
            alt={email}
            width={60}
            height={60}
            className={style.avatar}
            onError={handleImageError}
          />
          <div>
            <h3 className={style.username}>{username}</h3>
            {first_name && <p className={style.name}>{first_name}</p>}
          </div>
        </div>
      </Link>
      <div className={style.actions}>
        {!isOwnRecipe && (
          <ButtonSimple onClick={handleFollowClick} isActive={isFollowing.data}>
            {isFollowing.data ? t("unfollow") : t("follow")}
          </ButtonSimple>
        )}
        {isOwnRecipe && <ButtonSimple>Редагувати профіль</ButtonSimple>}
        <button className={style.moreButton}>
          <MoreVerticalIcon />
        </button>
      </div>
      <Drawer
        isOpen={showUnfollowPopup}
        onClose={() => setShowUnfollowPopup(false)}
      >
        <h3>{t("confirmUnfollow")}</h3>
        <p>{t("confirmUnfollowText", { username })}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
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
}

export default UserCard;
