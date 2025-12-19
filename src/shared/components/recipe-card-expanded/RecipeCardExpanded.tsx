import DateObject from "react-date-object";
import { useTranslation } from "react-i18next";
import style from "./RecipeCardExpanded.module.scss";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import { Link } from "react-router";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";
import CommentsIcon from "../../../assets/img/svg/CommentsIcon";
import type {
  FullUserDataInterface,
  RecipeInterface,
} from "../../types/UI.types";
import { useSession } from "../../../context/useSession";
import classNames from "classnames";
import OwnRecipeIcon from "../../../assets/img/svg/OwnRecipeIcon";

const FALLBACK_AVATAR =
  "/src/assets/img/fallback-images/general-category-image.png";
const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

interface RecipeCardExpandedProps {
  recipe: RecipeInterface;
  author?: FullUserDataInterface;
}

const RecipeCardExpanded = ({ recipe }: RecipeCardExpandedProps) => {
  const { t } = useTranslation("recipe");
  const { id, name, description, image, createdAt, favouriteCount, time } =
    recipe;
  const { user } = useSession();
  const date = new DateObject(createdAt);
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_AVATAR;
  };

  const authorData = (recipe.author as any)?.profile || recipe.author;

  const isLiked = recipe.likedByUserIds.includes(user ? user.id : "");
  const isOwnRecipe = user?.id === recipe.author.id;

  return (
    <Link to={`/recipe/${id}`}>
      <div className={style.recipeCardExpanded} key={id}>
        <div className={style.recipeHeader}>
          <img
            src={authorData?.avatar_url || FALLBACK_AVATAR}
            alt={recipe.author.username || "User"}
            className={style.authorAvatar}
            onError={handleAvatarError}
          />
          <div>
            <p className={style.authorUsername}>{recipe.author.username}</p>
            <p className={style.createdAt}>
              {date.format("DD/MM/YYYY - HH:mm")}
            </p>
          </div>
        </div>
        <div className={style.recipeContent}>
          <button className={style.likeButton}>
            <HeartIcon favourited={false} />
          </button>
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
              <p
                className={classNames(
                  style.rating,
                  { [style.liked]: isLiked },
                  { [style.isOwnRecipe]: isOwnRecipe },
                )}
              >
                {isOwnRecipe ? <OwnRecipeIcon /> : <RatingStarIcon />}{" "}
                {favouriteCount}
              </p>
              <p className={style.time}>
                {" "}
                <ClockIcon /> {time} {t("min")}
              </p>
              <p className={style.comments}>
                <CommentsIcon /> 121
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCardExpanded;
