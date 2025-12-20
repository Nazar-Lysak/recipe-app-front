import classNames from "classnames";
import { useTranslation } from "react-i18next";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";
import { useSession } from "../../../context/useSession";
import type { RecipeInterface } from "../../types/UI.types";
import styles from "./RecipeCardMinimal.module.scss";
import OwnRecipeIcon from "../../../assets/img/svg/OwnRecipeIcon";
import ClockIcon from "../../../assets/img/svg/ClockIcon";
import HeartIcon from "../../../assets/img/svg/HeartIcon";

interface RecipeCardMinimalProps {
  recipe: RecipeInterface;
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = FALLBACK_IMAGE;
};

const RecipeCardMinimal = ({ recipe }: RecipeCardMinimalProps) => {
  const { t } = useTranslation("recipe");
  const { time, name, image, author } = recipe;
  const { user } = useSession();

  const isLiked = recipe.likedByUserIds.includes(user ? user.id : "");
  const isOwnRecipe = user?.id === author.id;
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {!isOwnRecipe && (
          <span className={styles.likeIcon}>
            <HeartIcon favourited={isLiked} />
          </span>
        )}
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
              <RatingStarIcon /> 0
            </p>
            <p className={styles.time}>
              {" "}
              <ClockIcon /> {time} {t("min")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardMinimal;
