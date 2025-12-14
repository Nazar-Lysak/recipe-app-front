import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

const RecipePage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  const recipe = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/recipe/${recipeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipe");
      }
      return response.json();
    },
    enabled: !!recipeId,
  });

  if (recipe.isLoading) {
    return <PagePrealoader variant="transparent" />;
  }

  if (recipe.isError) {
    return <div>Помилка завантаження</div>;
  }

  if (!recipe.data) {
    return <div>Рецепт не знайдено</div>;
  }

  const { name, description, image, rating, time, ingredients, steps, author } = recipe.data;

  return (
    <div>
      <h1>{name}</h1>
      {image && <img src={image} alt={name} />}
      <p>{description}</p>
      
      <div style={{display: 'flex', gap: '1rem'}}>
        <span>Рейтинг: {rating}{" ⭐"}</span>
        <span>Час: {time} хв</span>
      </div>

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
