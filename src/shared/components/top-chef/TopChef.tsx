import { Link } from "react-router";
import { useRecipes } from "../../hooks/queries/useRecipes";
import type { RecipeInterface } from "../../types/UI.types";
import style from "./TopChef.module.scss";

const TopChef = () => {
  const recipes = useRecipes({ limit: 4, activeCategory: "1" });

  return (
    <>
      <h2 className={style.title}>Найкращий кухар</h2>
      <div className={style.chefs}>
        {recipes.data?.recipesList.map((recipe: RecipeInterface, i: number) => {
          const authorData = (recipe.author as any)?.profile || recipe.author;
          const { avatar_url } = authorData;
          const { id, username } = recipe.author;
          return (
            <Link key={i} to={`/user/${id}`} className={style.chefLink}>
              <img src={avatar_url} alt={username} />
              <h3 className={style.username}>{username}</h3>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TopChef;
