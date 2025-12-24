import MenuTop from "../../shared/components/menu-top/MenuTop";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import RecipeCardExpanded from "../../shared/components/recipe-card-expanded/RecipeCardExpanded";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";

const tabContentVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
  }),
};

const tabContentTransition = {
  duration: 0.3,
};

const tabContentAnimation = {
  variants: tabContentVariants,
  initial: "initial" as const,
  animate: "animate" as const,
  exit: "exit" as const,
  transition: tabContentTransition,
};

const CommunityPage = () => {
  const { t } = useTranslation("community");
  const [searchParams, setSearchParams] = useSearchParams();

  const elements = [
    { id: "1", name: t("topRecipes") },
    { id: "2", name: t("newRecipes") },
  ];

  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get("tab") || "1",
  );
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [allRecipes, setAllRecipes] = useState<any[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") || "1";
    setActiveCategory(tabFromUrl);
  }, [searchParams]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchParams({ tab: categoryId });
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

  const direction = activeCategory === "1" ? -1 : 1;

  return (
    <div>
      <MenuTop
        elements={elements}
        handleCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeCategory}
          custom={direction}
          {...tabContentAnimation}
        >
          {allRecipes.length > 0 && (
            <div>
              {allRecipes.map((recipe: any) => (
                <RecipeCardExpanded key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          <div ref={observerTarget} style={{ height: "20px" }} />

          {recipes.isLoading && <PagePrealoader variant="transparent" />}

          {!recipes.isLoading && allRecipes.length === 0 && (
            <p>{t("noRecipes")}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CommunityPage;
