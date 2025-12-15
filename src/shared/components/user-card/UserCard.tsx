import MoreVerticalIcon from "../../../assets/img/svg/MoreVerticalIcon";
import style from "./UserCard.module.scss";
import { Link } from "react-router";
import type { UserInterface } from "../../types/UI.types";

interface UserCardProps {
  user?: UserInterface;
}

interface RecipeCardProps {
    recipe?: {
        authorId: string;
    };
} 

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-category-image.png";

function UserCard({ user, recipe }: UserCardProps & RecipeCardProps) {
  const { avatar_url, email, first_name, username } = user || {};

  const authorId = recipe?.authorId;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className={style.wrapper}>
      <Link to={`/user/${authorId}`}>
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
        <button className={style.followButton}>Підписатись</button>
        <button className={style.moreButton}>
          <MoreVerticalIcon />
        </button>
      </div>
    </div>
  );
}

export default UserCard;
