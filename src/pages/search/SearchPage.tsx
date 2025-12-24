import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import Tabs from "../../shared/ui/tabs/Tabs";
import { useProfiles } from "../../shared/hooks/queries/useProfiles";
import UserListItem from "../../shared/components/user-list-item/UserListItem";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import InputText from "../../shared/ui/input-text/InputText";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import style from "./SearchPage.module.scss";
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

type TabType = "recipes" | "users";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>(
    (searchParams.get("tab") as TabType) || "recipes",
  );

  useEffect(() => {
    const tabFromUrl = (searchParams.get("tab") as TabType) || "recipes";
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  const direction = activeTab === "recipes" ? -1 : 1;

  const users = useProfiles({ date: true });
  const recipes = useRecipes({ activeCategory: "1" });

  const handleActiveTab = (activeTab: TabType) => {
    setActiveTab(activeTab);
    setSearchParams({ tab: activeTab });
  };

  return (
    <div className={style.searchPage}>
      <Tabs
        tabs={[
          { value: "recipes", label: "Рецепти" },
          { value: "users", label: "Користувачі" },
        ]}
        activeTab={activeTab}
        onTabChange={handleActiveTab}
      />
      <AnimatePresence mode="wait" custom={direction}>
        {activeTab === "recipes" ? (
          <motion.div
            key="recipes"
            custom={direction}
            {...tabContentAnimation}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <InputText placeholder="Пошук рецептів" />
            <RecipesGrid recipes={recipes.data?.recipesList || []} />
          </motion.div>
        ) : (
          <motion.div
            key="users"
            custom={direction}
            {...tabContentAnimation}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <InputText placeholder="Пошук користувачів" />
            {users.data?.profiles?.map((user: any) => (
              <UserListItem key={user.id} profile={user} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {users.isLoading ||
        (recipes.isLoading && <PagePrealoader variant="transparent" />)}
    </div>
  );
};

export default SearchPage;
