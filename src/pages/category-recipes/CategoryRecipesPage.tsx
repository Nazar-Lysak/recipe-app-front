import { useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

import { useRecipesByCategory } from "../../shared/hooks/queries/useRecipesByCategory";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";

const CategoryRecipesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const recipes = useRecipesByCategory(categoryId!);

  console.log("Recipes data:", recipes.data);

  return (
    <div>
      {recipes.isLoading && <PagePrealoader variant="transparent" />}

      {recipes.data && recipes.data.recipesList && (
        <RecipesGrid recipes={recipes.data.recipesList} />
      )}
    </div>
  );
};

export default CategoryRecipesPage;
