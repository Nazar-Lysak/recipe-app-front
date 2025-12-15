import RecipeCard from "../../../shared/components/recipe-сard/RecipeCard";
import { Link } from "react-router-dom";
import style from "./RecipesGrid.module.scss";
import type { Recipe } from "../../types/recipe.types";

interface RecipesGridProps {
  recipes: Recipe[];
}

const RecipesGrid = ({ recipes }: RecipesGridProps) => {
  return (
    <div className={style.list}>
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </div>
  );
};

export default RecipesGrid;
