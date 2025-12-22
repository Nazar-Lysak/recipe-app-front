import { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import ProfileAvatar from "../../shared/components/profile-avatar/ProfileAvatar";
import style from "./UserProfile.module.scss";

const UserProfile = () => {
  const { t } = useTranslation("userProfile");
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes",
  );
  const userId = useParams().userId;
  const userData = useUser(userId);

  const recipes = useRecipes({
    activeCategory: "all",
    username: userData.data?.username,
  });

  if (userData.isLoading || recipes.isLoading) {
    return <div>Завантаження...</div>;
  }

  if (userData.isError) {
    return <div>{t("errorLoading")}</div>;
  }

  const getActiveIndex = () => {
    return activeTab === "recipes" ? 0 : 1;
  };

  console.log("USER DATA:", recipes.data);

  return (
    <div>
      {userData.data && <ProfileAvatar userData={userData.data} />}

      {recipes.data.recipesCount > 0 && (
        <>
          <div className={style.buttons} data-active={getActiveIndex()}>
            <button
              className={style.button}
              onClick={() => setActiveTab("recipes")}
            >
              {t("recipes")}
            </button>
            <button
              className={style.button}
              onClick={() => setActiveTab("favorites")}
            >
              {t("likes")}
            </button>
          </div>
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
