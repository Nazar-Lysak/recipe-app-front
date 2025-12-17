import classNames from "classnames";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import { useSession } from "../../../context/SessionContext";
import type { RecipeInterface } from "../../types/UI.types";
import styles from "./RecipeCardMinimal.module.scss";
import OwnRecipeIcon from "../../../assets/img/svg/OwnRecipeIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";

interface RecipeCardMinimalProps {
  recipe: RecipeInterface;
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = FALLBACK_IMAGE;
};

const RecipeCardMinimal = ({ recipe }: RecipeCardMinimalProps) => {
  const { time, favouriteCount, name, image, author } = recipe;
  const { user } = useSession();

  const isOwnRecipe = user?.id === author.id;
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          className={styles.image}
          onError={handleImageError}
        />
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.stats}>
            <p
              className={classNames({
                [styles.rating]: true,
                [styles.isOwnRecipe]: isOwnRecipe,
              })}
            >
              {isOwnRecipe ? <OwnRecipeIcon /> : <RatingStarIcon />}{" "}
              {favouriteCount}
            </p>
            <p className={styles.time}>
              {" "}
              <ClockIcon /> {time} хв
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardMinimal;
