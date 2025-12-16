import DateObject from "react-date-object";
import style from "./RecipeCardExpandedM.module.scss";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";
import CommentsIcon from "../../../assets/img/svg/CommentsIcon";
import type {
  FullUserDataInterface,
  RecipeInterface,
} from "../../types/UI.types";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

interface RecipeCardExpandedProps {
  recipe: RecipeInterface;
  author?: FullUserDataInterface;
}

const RecipeCardExpandedM = ({ recipe }: RecipeCardExpandedProps) => {
  const { id, name, description, image, rating, time } = recipe;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className={style.recipeCardExpanded} key={id}>
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
            <p className={style.rating}>
              <RatingStarIcon /> {rating}
            </p>
            <p className={style.time}>
              {" "}
              <ClockIcon /> {time} хв
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardExpandedM;
