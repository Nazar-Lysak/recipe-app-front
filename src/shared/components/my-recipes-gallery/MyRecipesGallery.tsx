import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import style from "./MyRecipesGallery.module.scss";
import { useRecipes } from "../../hooks/queries/useRecipes";
import { useSession } from "../../../context/useSession";
import RecipeCardMinimal from "../recipe-card-minimal/RecipeCardMinimal";
import type { RecipeInterface } from "../../types/UI.types";

const MyRecipesGallery = () => {
  const { t } = useTranslation("recipe");
  const { fullUserData } = useSession();
  const recipes = useRecipes({
    limit: 10,
    activeCategory: "2",
    username: fullUserData?.username,
  });

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{t("yourRecipes")}</h2>
      {recipes.isLoading && <p>{t("loading")}</p>}
      {recipes.isError && <p>{t("error")}</p>}
      {recipes.data && recipes.data.recipesList.length === 0 && (
        <div className={style.emptyState}>
          <Link to="/create-recipe" className={style.createButton}>
            {t("addFirstRecipe")}
          </Link>
        </div>
      )}
      {recipes.data && recipes.data.recipesList.length > 0 && (
        <Swiper slidesPerView={2.3} spaceBetween={15}>
          <SwiperSlide className={style.swiperSlide}>
            <Link to="/create-recipe" className={style.createRecipeCard}>
              <div className={style.createRecipeContent}>
                <span className={style.plusIcon}>+</span>
                <span className={style.createText}>{t("addRecipe")}</span>
              </div>
            </Link>
          </SwiperSlide>
          {recipes.data.recipesList.map((recipe: RecipeInterface) => (
            <SwiperSlide key={recipe.id} className={style.swiperSlide}>
              <Link to={`/recipe/${recipe.id}`}>
                <RecipeCardMinimal recipe={recipe} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MyRecipesGallery;
