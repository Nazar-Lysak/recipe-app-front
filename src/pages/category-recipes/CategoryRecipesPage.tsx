import { useParams } from "react-router-dom";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

import { useRecipesByCategory } from "../../shared/hooks/queries/useRecipesByCategory";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import MenuTop from "../../shared/components/menu-top/MenuTop";
import { useCategories } from "../../shared/hooks/queries/useCategories";
import { useState } from "react";

const CategoryRecipesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryId || "",
  );

  const recipes = useRecipesByCategory(activeCategory!);
  const categories = useCategories();

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div>
      {recipes.isLoading && <PagePrealoader variant="transparent" />}
      {categories.data && (
        <MenuTop
          elements={categories.data.categories}
          handleCategoryClick={handleCategoryClick}
          activeCategory={activeCategory}
        />
      )}
      {recipes.data && recipes.data.recipesList && (
        <RecipesGrid recipes={recipes.data.recipesList} />
      )}
    </div>
  );
};

export default CategoryRecipesPage;
