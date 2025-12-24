import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import ProfileAvatar from "../../shared/components/profile-avatar/ProfileAvatar";
import Tabs from "../../shared/ui/tabs/Tabs";
import style from "./UserProfile.module.scss";

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

const UserProfile = () => {
  const { t } = useTranslation("userProfile");
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"all" | "favorites">(
    (searchParams.get("tab") as "all" | "favorites") || "all",
  );
  const userId = useParams().userId;
  const userData = useUser(userId);

  useEffect(() => {
    const tabFromUrl =
      (searchParams.get("tab") as "all" | "favorites") || "all";
    setActiveTab(tabFromUrl);
  }, [searchParams]);

  const handleActiveTab = (tab: "all" | "favorites") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const recipes = useRecipes({
    activeCategory: activeTab,
    username: activeTab === "all" ? userData.data?.username : undefined,
    likedBy: activeTab === "favorites" ? userId : undefined,
  });

  if (userData.isLoading || recipes.isLoading) {
    return <div>Завантаження...</div>;
  }

  if (userData.isError) {
    return <div>{t("errorLoading")}</div>;
  }

  const tabs = [
    { value: "all" as const, label: t("recipes") },
    { value: "favorites" as const, label: t("likes") },
  ];

  const direction = activeTab === "all" ? -1 : 1;

  return (
    <div>
      {userData.data && <ProfileAvatar userData={userData.data} />}

      {recipes.data.recipesCount > 0 && (
        <>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleActiveTab} />
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              {...tabContentAnimation}
            >
              <RecipesGrid recipes={recipes.data?.recipesList || []} />
            </motion.div>
          </AnimatePresence>
        </>
      )}
      {recipes.data.recipesCount === 0 && (
        <div className={style.noRecipes}>{t("noRecipes")}</div>
      )}
    </div>
  );
};

export default UserProfile;
