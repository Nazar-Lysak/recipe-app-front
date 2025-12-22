import type {
  FullUserDataInterface,
  RecipeInterface,
} from "../../types/UI.types";
import ButtonSimple from "../../ui/button-simple/ButtonSimple";
import RatingStars from "../rating-stars/RatingStars";
import { useTranslation } from "react-i18next";

import style from "./RecipeReviewCard.module.scss";
import { useNavigate } from "react-router";

const RecipeReviewCard = ({
  recipe,
  author,
}: {
  recipe: RecipeInterface;
  author: FullUserDataInterface | undefined;
}) => {
  const { t } = useTranslation("review");
  const navigate = useNavigate();

  const handleLiveReview = () => {
    navigate(`/leave-review/${recipe.id}`);
  };

  const userNameValidation = () => {
    if (author?.first_name?.length && author?.last_name) {
      return `${author.first_name} ${author.last_name}`;
    }
    return author?.username;
  };
  return (
    <div className={style.container}>
      <div className={style.image}>
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div className={style.content}>
        <h2 className={style.title}>{recipe.name}</h2>
        <div className={style.rating}>
          <RatingStars
            readonly
            size="small"
            rating={recipe.averageRating}
            theme="light"
          />
          <p>
            ({recipe.reviewsCount} {t("reviews")})
          </p>
        </div>
        <div className={style.reviewText}>
          <img src={author?.avatar_url || ""} alt={userNameValidation()} />
          <div>
            <p className={style.reviewerUserName}>@{author?.username}</p>
            <p className={style.reviewerName}>{userNameValidation()}</p>
          </div>
        </div>

        <ButtonSimple variant="light" onClick={handleLiveReview}>
          {t("addReview")}
        </ButtonSimple>
      </div>
    </div>
  );
};

export default RecipeReviewCard;
