import { Link, useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import RecipeCard from "../../shared/components/recipe-сard/RecipeCard";
import { useRecipesByCategory } from "../../shared/hooks/queries/useRecipesByCategory";

const CategoryRecipesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const recipes = useRecipesByCategory(categoryId!);

  console.log("Recipes data:", recipes.data);

  return (
    <div>
      {recipes.isLoading && <PagePrealoader variant="transparent" />}

      {recipes.data &&
        (recipes.data.recipesList && recipes.data.recipesList.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(auto, 2fr))",
              gap: "20px",
              gridAutoRows: "1fr",
            }}
          >
            {recipes.data.recipesList.map((recipe: any) => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
          </div>
        ) : (
          recipes.data && <p>No recipes found in this category.</p>
        ))}
    </div>
  );
};

export default CategoryRecipesPage;
