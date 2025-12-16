import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import type { RecipeInterface } from "../../types/UI.types";
import styles from "./RecipeCardMinimal.module.scss";

interface RecipeCardMinimalProps {
  recipe: RecipeInterface;
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = FALLBACK_IMAGE;
};

const RecipeCardMinimal = ({ recipe }: RecipeCardMinimalProps) => {
  const { time, rating, name, image } = recipe;

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
            <p className={styles.rating}>
              {rating} <RatingStarIcon />
            </p>
            <p className={styles.time}>{time} хв</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardMinimal;
