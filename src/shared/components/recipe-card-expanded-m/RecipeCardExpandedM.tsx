import { useTranslation } from "react-i18next";
import style from "./RecipeCardExpandedM.module.scss";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";
import type {
  FullUserDataInterface,
  RecipeInterface,
} from "../../types/UI.types";
import { useSession } from "../../../context/useSession";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

interface RecipeCardExpandedProps {
  recipe: RecipeInterface;
  author?: FullUserDataInterface;
}

const RecipeCardExpandedM = ({ recipe }: RecipeCardExpandedProps) => {
  const { t } = useTranslation("recipe");
  const { id, name, description, image, time, averageRating } = recipe;

  const { user } = useSession();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const isOwnRecipe = user?.id === recipe.author.id;
  const isLiked = recipe.likedByUserIds.includes(user ? user.id : "");

  return (
    <div key={id}>
      <div className={style.recipeContent}>
        {!isOwnRecipe && (
          <span className={style.likeButton}>
            <HeartIcon favourited={isLiked} />
          </span>
        )}
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          className={style.recipeImage}
          onError={handleImageError}
        />
        <div className={style.recipeDetails}>
          <div>
            <h2 className={style.recipeName}>{name}</h2>
            <p className={style.recipeDescription}>{description}</p>
          </div>
          <div className={style.recipeStats}>
            <p className={style.rating}>
              <RatingStarIcon /> {averageRating}
            </p>
            <p className={style.time}>
              {" "}
              <ClockIcon /> {time} {t("min")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardExpandedM;
