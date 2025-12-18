import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router";

import style from "./MyRecipesGallery.module.scss";
import { useRecipes } from "../../hooks/queries/useRecipes";
import { useSession } from "../../../context/useSession";
import RecipeCardMinimal from "../recipe-card-minimal/RecipeCardMinimal";
import type { RecipeInterface } from "../../types/UI.types";

const MyRecipesGallery = () => {
  const { fullUserData } = useSession();
  const recipes = useRecipes({
    limit: 10,
    activeCategory: "2",
    username: fullUserData?.username,
  });

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Ваші рецепти</h2>
      {recipes.isLoading && <p>Loading...</p>}
      {recipes.isError && <p>Error loading recipes.</p>}
      {recipes.data && recipes.data.recipesList.length === 0 && (
        <div className={style.emptyState}>
          <Link to="/create-recipe" className={style.createButton}>
            Додати перший рецепт
          </Link>
        </div>
      )}
      {recipes.data && recipes.data.recipesList.length > 0 && (
        <Swiper slidesPerView={2.3} spaceBetween={15}>
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
