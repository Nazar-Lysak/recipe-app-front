import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import style from "./NewestRecipesGallery.module.scss";
import { useRecipes } from "../../hooks/queries/useRecipes";
import type { RecipeInterface } from "../../types/UI.types";
import RecipeCardExpandedM from "../recipe-card-expanded-m/RecipeCardExpandedM";

const NewestRecipesGallery = () => {
  const { t } = useTranslation("recipe");
  const recipes = useRecipes({
    limit: 10,
    activeCategory: "2",
  });

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{t("recentRecipes")}</h2>
      {recipes.isLoading && <p>{t("loading")}</p>}
      {recipes.isError && <p>{t("error")}</p>}
      {recipes.data && recipes.data.recipesList.length > 0 && (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={24}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {recipes.data.recipesList.map((recipe: RecipeInterface) => (
            <SwiperSlide key={recipe.id} className={style.swiperSlide}>
              <Link to={`/recipe/${recipe.id}`}>
                <RecipeCardExpandedM recipe={recipe} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default NewestRecipesGallery;
