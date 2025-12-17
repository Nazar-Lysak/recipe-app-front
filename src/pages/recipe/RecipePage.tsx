import { motion, AnimatePresence } from "framer-motion";
import classNames from 'classnames';
import { useOptimistic, startTransition } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import styles from "./RecipePage.module.scss";
import CommentsIcon from "../../assets/img/svg/CommentsIcon";
import RatingStarIcon from "../../assets/img/svg/RatingStarIcon";
import UserCard from "../../shared/components/user-card/UserCard";
import { useUser } from "../../shared/hooks/queries/useUser";
import ClockIcon from "../../assets/img/svg/ClockIcon";
import { useSession } from "../../context/SessionContext";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const RecipePage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { token } = useSession();
  const queryClient = useQueryClient();

  const recipe = useRecipe(recipeId || "");
  const { fullUserData, user } = useSession();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const authorRecipe = useUser(recipe.data?.authorId);

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    recipe.data?.favouriteCount || 0,
    (_, newValue: number) => newValue
  );

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

  const handleLike = async () => {
    startTransition(() => {
      setOptimisticLikes(optimisticLikes + 1);
    });

    try {
      await axios.post(
        `http://localhost:3000/recipe/${recipeId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  const isLiked = fullUserData?.liked_recipes?.includes(recipeId || "");
  console.log("+++++++++++++++++++++++++++++++++++");

  console.log("RecipeId:", recipe.data.likedByUserIds);
  console.log("User:", user);
  console.log("FullUserData:", fullUserData);

  console.log("+++++++++++++++++++++++++++++++++++");
  
  // console.log("Recipe:", recipe.data.likedByUserIds.includes(user?.id || ""));

  // console.log("Is liked:", isLiked);

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
              { [styles.liked]: isLiked }
            )}
            onClick={handleLike}
          >
            <RatingStarIcon />
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
      <UserCard user={authorRecipe.data} recipe={recipe.data} />
      <div className={styles.detailsSection}>
        <p className={styles.detailsTitle}>Details</p>
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
    </div>
  );
};

export default RecipePage;
