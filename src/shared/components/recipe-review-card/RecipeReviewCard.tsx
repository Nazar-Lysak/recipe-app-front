import ButtonSimple from "../../ui/button-simple/ButtonSimple";
import RatingStars from "../rating-stars/RatingStars";

import style from "./RecipeReviewCard.module.scss";

const RecipeReviewCard = () => {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <img
          src="https://res.cloudinary.com/dohg7oxwo/image/upload/v1765885533/%D0%BC%D0%BB%D0%B8%D0%BD%D1%86%D1%96-%D0%B7-%D0%B1%D0%B0%D0%BD%D0%B0%D0%BD%D0%BE%D0%BC_nuqci8.png"
          alt=""
        />
      </div>
      <div className={style.content}>
        <h2 className={style.title}>Chicken Burger Chicken Burger Chicken Burger</h2>
        <div className={style.rating}>
          <RatingStars readonly size="small" rating={4} theme="light" />
          <p>(456 reviews)</p>
        </div>
        <div className={style.reviewText}>
          <img
            src="https://res.cloudinary.com/dohg7oxwo/image/upload/v1766250988/avatars/fmk5tkjcwbhxihs6qcvg.webp"
            alt=""
          />
          <div>
            <p className={style.reviewerUserName}>@Andrew-Mar</p>
            <p className={style.reviewerName}>Andrew Martinez-Chef</p>
          </div>
        </div>

        <ButtonSimple variant="light">Add review</ButtonSimple>
      </div>
    </div>
  );
};

export default RecipeReviewCard;
