import ClockIcon from "../../../assets/img/svg/ClockIcon";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import style from "./RecipeCard.module.scss";
import type { Recipe } from "../../types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { image, name, description, rating, time } = recipe;
  return (
    <div className={style.card}>
      <button className={style.favorite}>
        <HeartIcon favourited={false} />
      </button>
      <img
        className={style.image}
        src={image || "/src/assets/img/onboarding/onboarding-1.jpg"}
        alt={name}
      />
      <h3 className={style.title}>{name}</h3>
      <p className={style.description}>{description}</p>
      <div className={style.info}>
        <span className={style.rating}>
          {rating}
          <RatingStarIcon />
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
