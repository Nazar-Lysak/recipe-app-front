import { useParams } from "react-router";
import RecipeReviewCard from "../../shared/components/recipe-review-card/RecipeReviewCard";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useTranslation } from "react-i18next";

import style from "../PageStyles.module.scss";
const RecipeReviewPage = () => {
  const { recipeId } = useParams();

  const recipe = useRecipe(recipeId || "");
  const author = useUser(recipe.data?.authorId);
  const {t} = useTranslation(["community", "common"]);

  if (recipe.isLoading || author.isLoading) {
    return <div>{t("common:loading")}</div>;
  }

  if (recipe.isError) {
    return <div>{t("common:error")}</div>;
  }

  if (!recipe.data) {
    return <div>{t("community:recipeNotFound")}</div>;
  }

  return (
    <div>
      <RecipeReviewCard recipe={recipe.data} author={author.data} />
      <h2 className={style.accentTitle}>Коментарі</h2>
    </div>
  );
};

export default RecipeReviewPage;
