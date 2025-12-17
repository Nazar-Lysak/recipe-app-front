import style from "./RecipeCardExpandedM.module.scss";
import HeartIcon from "../../../assets/img/svg/HeartIcon";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";
import type {
  FullUserDataInterface,
  RecipeInterface,
} from "../../types/UI.types";
import { useSession } from "../../../context/SessionContext";
import OwnRecipeIcon from "../../../assets/img/svg/OwnRecipeIcon";
import classNames from "classnames";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

interface RecipeCardExpandedProps {
  recipe: RecipeInterface;
  author?: FullUserDataInterface;
}

const RecipeCardExpandedM = ({ recipe }: RecipeCardExpandedProps) => {
  const { id, name, description, image, favouriteCount, time } = recipe;

  const { user } = useSession();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const isOwnRecipe = user?.id === recipe.author.id;

  return (
    <div key={id}>
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
              className={classNames({
                [style.rating]: true,
                [style.isOwnRecipe]: isOwnRecipe,
              })}
            >
              {isOwnRecipe ? <OwnRecipeIcon /> : <RatingStarIcon />}{" "}
              {favouriteCount}
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
