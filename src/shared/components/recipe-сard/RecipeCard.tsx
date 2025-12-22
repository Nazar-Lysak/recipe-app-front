import ClockIcon from "../../../assets/img/svg/ClockIcon";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import style from "./RecipeCard.module.scss";
import type { RecipeInterface } from "../../types/UI.types";
import { useSession } from "../../../context/useSession";

interface RecipeCardProps {
  recipe: RecipeInterface;
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { image, name, description, time, author, averageRating } = recipe;
  const { user } = useSession();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const isLiked = recipe.likedByUserIds.includes(user ? user.id : "");
  const isOwnRecipe = user?.id === author.id;

  return (
    <div className={style.card}>
      {!isOwnRecipe && (
        <button className={style.favorite}>
          <HeartIcon favourited={isLiked} />
        </button>
      )}
      <img
        className={style.image}
        src={image || FALLBACK_IMAGE}
        alt={name}
        onError={handleImageError}
      />
      <h3 className={style.title}>{name}</h3>
      <p className={style.description}>{description}</p>
      <div className={style.info}>
        <span className={style.rating}>
          <RatingStarIcon /> {averageRating}
        </span>
        <span className={style.time}>
          <ClockIcon />
          {time}хв
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;
