import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";

import { useRecipesByCategory } from "../../shared/hooks/queries/useRecipesByCategory";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import MenuTop from "../../shared/components/menu-top/MenuTop";
import { useCategories } from "../../shared/hooks/queries/useCategories";
import pageStyles from "../PageStyles.module.scss";

const CategoryRecipesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryId || "",
  );

  const recipes = useRecipesByCategory(activeCategory!);
  const categories = useCategories();

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    navigate(`/categories/${category}`);
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

      {recipes.data?.recipesList.length === 0 && (
        <p className={pageStyles.emptyData}>
          Рецепти не знайдено в цій категорії.
        </p>
      )}
    </div>
  );
};

export default CategoryRecipesPage;
