import MenuTop from "../../shared/components/menu-top/MenuTop";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import RecipeCardExpanded from "../../shared/components/recipe-card-expanded/RecipeCardExpanded";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";

const CommunityPage = () => {
  const { t } = useTranslation("community");

  const elements = [
    { id: "1", name: t("topRecipes") },
    { id: "2", name: t("newRecipes") }, 
  ];

  const [activeCategory, setActiveCategory] = useState<string>("1");
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [allRecipes, setAllRecipes] = useState<any[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOffset(0);
    setAllRecipes([]);
  };

  const recipes = useRecipes({ activeCategory, limit, offset });

  useEffect(() => {
    if (recipes.data?.recipesList) {
      if (offset === 0) {
        setAllRecipes(recipes.data.recipesList);
      } else {
        setAllRecipes((prev) => [...prev, ...recipes.data.recipesList]);
      }
    }
  }, [recipes.data, offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !recipes.isLoading &&
          recipes.data?.recipesList?.length === limit
        ) {
          setOffset((prev) => prev + limit);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [recipes.isLoading, recipes.data, limit]);

  return (
    <div>
      <MenuTop
        elements={elements}
        handleCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />

      {allRecipes.length > 0 && (
        <div>
          {allRecipes.map((recipe: any) => (
            <RecipeCardExpanded key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      <div ref={observerTarget} style={{ height: "20px" }} />

      {recipes.isLoading && <PagePrealoader variant="transparent" />}

      {!recipes.isLoading && allRecipes.length === 0 && <p>{t("noRecipes")}</p>}
    </div>
  );
};

export default CommunityPage;
