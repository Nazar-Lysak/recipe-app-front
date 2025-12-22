import { useParams } from "react-router";
import RecipeReviewCard from "../../shared/components/recipe-review-card/RecipeReviewCard";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import { useUser } from "../../shared/hooks/queries/useUser";
import { useTranslation } from "react-i18next";
import Comment from "../../shared/components/comment/Comment";

import style from "../PageStyles.module.scss";
const RecipeReviewPage = () => {
  const { recipeId } = useParams();

  const recipe = useRecipe(recipeId || "");
  const author = useUser(recipe.data?.authorId);
  const { t } = useTranslation(["community", "common"]);

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
      {[1, 2, 3, 4, 5, 6, 7].map((item) => {
        return <Comment key={item} />;
      })}
    </div>
  );
};

export default RecipeReviewPage;
