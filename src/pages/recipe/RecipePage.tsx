import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import styles from "./RecipePage.module.scss";
import CommentsIcon from "../../assets/img/svg/CommentsIcon";
import RatingStarIcon from "../../assets/img/svg/RatingStarIcon";
import UserCard from "../../shared/components/user-card/UserCard";
import { useUser } from "../../shared/hooks/queries/useUser";
import ClockIcon from "../../assets/img/svg/ClockIcon";
import { useSession } from "../../context/useSession";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import { useLike } from "../../shared/hooks/mutations/useLike";
import OwnRecipeIcon from "../../assets/img/svg/OwnRecipeIcon";
import { useState } from "react";
import Drawer from "../../shared/components/drawer/Drawer";
import ButtonSimple from "../../shared/ui/button-simple/ButtonSimple";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const RecipePage = () => {
  const [confirmDislike, setConfirmDislike] = useState(false);
  const { user } = useSession();
  const { recipeId } = useParams<{ recipeId: string }>();

  const recipe = useRecipe(recipeId || "");
  const { optimisticLikes, handleLike } = useLike(
    recipeId || "",
    recipe.data?.favouriteCount || 0,
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleLikeClick = (isLiked: boolean) => {
    if (isLiked) {
      setConfirmDislike(true);
      return;
    }
    handleLike(isLiked);
  };

  const handleConfirmDislike = () => {
    handleLike(true);
    setConfirmDislike(false);
  };

  const authorRecipe = useUser(recipe.data?.authorId);

  if (recipe.isLoading) {
    return <PagePrealoader variant="transparent" />;
  }

  if (recipe.isError) {
    return <div>Помилка завантаження</div>;
  }

  if (!recipe.data) {
    return <div>Рецепт не знайдено</div>;
  }

  const { name, description, image, time, ingredients, steps } = recipe.data;
  const isLiked = recipe.data.likedByUserIds.includes(user?.id || "");
  const isOwnRecipe = user?.id === recipe.data.authorId;

  return (
    <div>
      <div className={styles.header}>
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          onError={handleImageError}
          className={styles.image}
        />
        <div className={styles.details}>
          <h1 className={styles.title}>{name}</h1>
          <button
            className={classNames(
              styles.rating,
              { [styles.liked]: isLiked },
              { [styles.ownRecipe]: isOwnRecipe },
            )}
            disabled={isOwnRecipe}
            onClick={() => handleLikeClick(isLiked)}
          >
            {isOwnRecipe ? <OwnRecipeIcon /> : <RatingStarIcon />}
            <AnimatePresence mode="wait">
              <motion.span
                key={optimisticLikes}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={styles.count}
              >
                {optimisticLikes}
              </motion.span>
            </AnimatePresence>
          </button>
          <button className={styles.comments}>
            <CommentsIcon /> 199
          </button>
        </div>
      </div>
      <UserCard
        authorData={authorRecipe.data}
        recipe={recipe.data}
        isOwnRecipe={isOwnRecipe}
      />
      <div className={styles.detailsSection}>
        <p className={styles.detailsTitle}>Опис</p>
        <p className={styles.time}>
          <ClockIcon />
          {time} хвилин
        </p>
      </div>

      <p className={styles.description}>{description}</p>

      <div>
        <h2 className={styles.detailsTitle}>Інгредієнти</h2>
        <ul>
          {ingredients?.map((ingredient: string, index: number) => (
            <li key={index} className={styles.ingredients}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className={styles.detailsTitle}>Кроки</h2>
        <ul className={styles.stepsList}>
          {steps?.map((step: string, index: number) => (
            <li key={index} className={styles.steps}>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <Drawer
        direction="bottom"
        isOpen={confirmDislike}
        onClose={() => setConfirmDislike(false)}
      >
        <h3>Видалити зі збережених?</h3>
        <p>Ви впевнені, що хочете прибрати рецепт зі збережених?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <ButtonSimple onClick={() => setConfirmDislike(false)}>
            Ні
          </ButtonSimple>
          <ButtonSimple isActive={true} onClick={handleConfirmDislike}>
            Так
          </ButtonSimple>
        </div>
      </Drawer>
    </div>
  );
};

export default RecipePage;
