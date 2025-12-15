import DateObject from "react-date-object";
import style from "./RecipeCardExpanded.module.scss";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import { Link } from "react-router";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";
import CommentsIcon from "../../../assets/img/svg/CommentsIcon";
import type { Recipe } from "../../types/recipe.types";

const FALLBACK_AVATAR =
  "/src/assets/img/fallback-images/general-category-image.png";
const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

interface RecipeCardExpandedProps {
  recipe: Recipe;
}

const RecipeCardExpanded = ({ recipe }: RecipeCardExpandedProps) => {
  const { id, name, description, image, author, createdAt, rating, time } = recipe;

  var date = new DateObject(createdAt);
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_AVATAR;
  };

  return (
    <Link to={`/recipe/${id}`}>
      <div className={style.recipeCardExpanded} key={id}>
        <div className={style.recipeHeader}>
          <img
            src={author.profile.avatar_url || FALLBACK_AVATAR}
            alt={author?.username || "User"}
            className={style.authorAvatar}
            onError={handleAvatarError}
          />
          <div>
            <p className={style.authorUsername}>{author?.username}</p>
            <p className={style.createdAt}>{date.format("DD/MM/YYYY")}</p>
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
                <p className={style.rating}><RatingStarIcon />{" "} {rating}</p>
                <p className={style.time}> <ClockIcon /> {time} хв</p>
                <p className={style.comments}><CommentsIcon /> 121</p>
            </div>
            
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCardExpanded;
