import MoreVerticalIcon from "../../../assets/img/svg/MoreVerticalIcon";
import style from "./UserCard.module.scss";

interface UserCardProps {
  user?: {
    id: string;
    name: string;
    avatarUrl: string;
    email: string;
    username: string;
    first_name: string;
  };
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-category-image.png";

function UserCard({ user }: UserCardProps) {
  const { avatarUrl, email, first_name, username } = user || {};

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className={style.wrapper}>
      <div className={style.userInfo}>
        <img
          src={avatarUrl || FALLBACK_IMAGE}
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
