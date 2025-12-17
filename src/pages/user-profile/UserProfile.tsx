import { useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import ProfileAvatar from "../../shared/components/profile-avatar/ProfileAvatar";
import style from "./UserProfile.module.scss";

const UserProfile = () => {
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
    return <div>Помилка завантаження профілю користувача.</div>;
  }

  const getActiveIndex = () => {
    return activeTab === "recipes" ? 0 : 1;
  };

  return (
    <div>
      {userData.data && <ProfileAvatar userData={userData.data} />}
      <div className={style.buttons} data-active={getActiveIndex()}>
        <button
          className={style.button}
          onClick={() => setActiveTab("recipes")}
        >
          Рецепти
        </button>
        <button
          className={style.button}
          onClick={() => setActiveTab("favorites")}
        >
          Улюблені
        </button>
      </div>
      <RecipesGrid recipes={recipes.data?.recipesList || []} />
    </div>
  );
};

export default UserProfile;
