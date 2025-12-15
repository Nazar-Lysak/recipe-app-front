import { useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import styles from "./RecipePage.module.scss";
import CommentsIcon from "../../assets/img/svg/CommentsIcon";
import RatingStarIcon from "../../assets/img/svg/RatingStarIcon";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import UserCard from "../../shared/components/user-card/UserCard";
import { useUser } from "../../shared/hooks/queries/useUser";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const RecipePage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const recipe = useRecipe(recipeId!);
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

  const { name, description, image, rating, time, ingredients, steps, author } =
    recipe.data;

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
          <span className={styles.rating}>
            <RatingStarIcon /> {rating}
          </span>
          <span className={styles.comments}>
            <CommentsIcon /> 199
          </span>
        </div>
      </div>
      <UserCard user={authorRecipe.data} />

      <p>{description}</p>

      <span>{time}</span>
      {author && <p>Автор: {author.username}</p>}
      <div>
        <h2>Інгредієнти</h2>
        <ul>
          {ingredients?.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Кроки</h2>
        <ol>
          {steps?.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
