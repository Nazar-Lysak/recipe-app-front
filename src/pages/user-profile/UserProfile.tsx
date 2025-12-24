import { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import ProfileAvatar from "../../shared/components/profile-avatar/ProfileAvatar";
import Tabs from "../../shared/ui/tabs/Tabs";
import style from "./UserProfile.module.scss";

const UserProfile = () => {
  const { t } = useTranslation("userProfile");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const userId = useParams().userId;
  const userData = useUser(userId);

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

  return (
    <div>
      {userData.data && <ProfileAvatar userData={userData.data} />}

      {recipes.data.recipesCount > 0 && (
        <>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <RecipesGrid recipes={recipes.data?.recipesList || []} />
        </>
      )}
      {recipes.data.recipesCount === 0 && (
        <div className={style.noRecipes}>{t("noRecipes")}</div>
      )}
    </div>
  );
};

export default UserProfile;
