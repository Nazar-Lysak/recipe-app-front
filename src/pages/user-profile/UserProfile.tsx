import { useParams } from "react-router";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";
import ProfileAvatar from "../../shared/components/profile-avatar/ProfileAvatar";

const UserProfile = () => {
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

  return (
    <div>
      {userData.data && <ProfileAvatar userData={userData.data} />}
      <RecipesGrid recipes={recipes.data?.recipesList || []} />
    </div>
  );
};

export default UserProfile;
