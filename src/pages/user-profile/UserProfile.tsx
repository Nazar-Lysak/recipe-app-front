import { useParams } from "react-router";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useRecipes } from "../../shared/hooks/queries/useRecipes";
import RecipesGrid from "../../shared/components/recipes-grid/RecipesGrid";



const UserProfile = () => {

    const userId = useParams().userId;

    const userData = useUser(userId);

    const recipes = useRecipes({
        activeCategory: "all",
        username: userData.data?.username
    });

    return (
        <div>
            <h1>{userData.data?.username}</h1>
            <h2>{userData.data?.email}</h2>
            <RecipesGrid recipes={recipes.data?.recipesList || []} />
        </div>
    )
}

export default UserProfile;