import { Link, useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "../../shared/components/recipe-сard/RecipeCard";

const CategoryRecipesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const recipes = useQuery({
    queryKey: [categoryId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/recipe?category=${categoryId}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  console.log("Recipes data:", recipes.data);

  return (
    <div>
      {recipes.isLoading && <PagePrealoader variant="transparent" />}

      {recipes.data &&
        (recipes.data.recipesList && recipes.data.recipesList.length > 0
          ? recipes.data.recipesList.map((recipe: any) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))
          : recipes.data && <p>No recipes found in this category.</p>)}
    </div>
  );
};

export default CategoryRecipesPage;
