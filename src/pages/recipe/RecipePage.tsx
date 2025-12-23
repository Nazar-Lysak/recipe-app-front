import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import styles from "./RecipePage.module.scss";
import CommentsIcon from "../../assets/img/svg/CommentsIcon";
import RatingStarIcon from "../../assets/img/svg/RatingStarIcon";
import UserCard from "../../shared/components/user-card/UserCard";
import { useUser } from "../../shared/hooks/queries/useUser";
import ClockIcon from "../../assets/img/svg/ClockIcon";
import { useSession } from "../../context/useSession";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import { useLike } from "../../shared/hooks/mutations/useLike";
import { useState } from "react";
import Drawer from "../../shared/components/drawer/Drawer";
import ButtonSimple from "../../shared/ui/button-simple/ButtonSimple";
import HeartIcon from "../../assets/img/svg/HeartIcon";
import Popup from "../../shared/components/popup/Popup";
import Button from "../../shared/ui/button/Button";
import RatingStars from "../../shared/components/rating-stars/RatingStars";

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-recipe-image.png";

const RecipePage = () => {
  const { t } = useTranslation("recipe");
  const [confirmDislike, setConfirmDislike] = useState(false);
  const [ratingPopup, setRatingPopup] = useState(false);
  const navigate = useNavigate();
  const { user } = useSession();
  const { recipeId } = useParams<{ recipeId: string }>();

  const recipe = useRecipe(recipeId || "");
  const { optimisticLikes, handleLike } = useLike(
    recipeId || "",
    recipe.data?.favouriteCount || 0,
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleLikeClick = (isLiked: boolean) => {
    if (isLiked) {
      setConfirmDislike(true);
      return;
    }
    handleLike(isLiked);
  };

  const handleConfirmDislike = () => {
    handleLike(true);
    setConfirmDislike(false);
  };

  const createReview = () => {
    navigate(`/leave-review/${recipeId}`);
    setRatingPopup(false);
  };

  const authorRecipe = useUser(recipe.data?.authorId);

  if (recipe.isLoading) {
    return <PagePrealoader variant="transparent" />;
  }

  if (recipe.isError) {
    return <div>Помилка завантаження</div>;
  }

  if (!recipe.data) {
    return <div>Рецепт не знайдено</div>;
  }

  const {
    name,
    description,
    image,
    time,
    ingredients,
    steps,
    averageRating,
    reviewsCount,
  } = recipe.data;
  const isLiked = recipe.data.likedByUserIds.includes(user?.id || "");
  const isOwnRecipe = user?.id === recipe.data.authorId;

  return (
    <div>
      <div className={styles.header}>
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          onError={handleImageError}
          className={styles.image}
        />
        {!isOwnRecipe && (
          <motion.button
            key={optimisticLikes}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.likeButton}
            onClick={() => handleLikeClick(isLiked)}
          >
            <HeartIcon favourited={isLiked} />
          </motion.button>
        )}

        <div className={styles.details}>
          <h1 className={styles.title}>{name}</h1>

          <button
            className={styles.rating}
            onClick={() => setRatingPopup(!ratingPopup)}
          >
            <RatingStarIcon /> {averageRating}
          </button>
          <Link to={`/recipe-review/${recipeId}`} className={styles.comments}>
            <CommentsIcon /> {reviewsCount}
          </Link>
        </div>
      </div>
      <UserCard
        authorData={authorRecipe.data}
        recipe={recipe.data}
        isOwnRecipe={isOwnRecipe}
      />
      <div className={styles.detailsSection}>
        <p className={styles.detailsTitle}>{t("description")}</p>
        <p className={styles.time}>
          <ClockIcon />
          {time} {t("minutes")}
        </p>
      </div>

      <p className={styles.description}>{description}</p>

      <div>
        <h2 className={styles.detailsTitle}>{t("ingredients")}</h2>
        <ul>
          {ingredients?.map((ingredient: string, index: number) => (
            <li key={index} className={styles.ingredients}>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className={styles.detailsTitle}>{t("steps")}</h2>
        <ul className={styles.stepsList}>
          {steps?.map((step: string, index: number) => (
            <li key={index} className={styles.steps}>
              {step}
            </li>
          ))}
        </ul>
      </div>

      <Popup isOpen={ratingPopup} onClose={() => setRatingPopup(false)}>
        <h2>Оцініть будь ласка страву "{name}"</h2>
        <RatingStars />
        <p>Ваш відгук допомагає нам ставати кращими.</p>
        <Button onClick={() => createReview()}>Оцінити</Button>
      </Popup>

      <Drawer
        direction="bottom"
        isOpen={confirmDislike}
        onClose={() => setConfirmDislike(false)}
      >
        <h3>{t("removeFromSaved")}</h3>
        <p>{t("confirmRemove")}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <ButtonSimple onClick={() => setConfirmDislike(false)}>
            {t("no")}
          </ButtonSimple>
          <ButtonSimple isActive={true} onClick={handleConfirmDislike}>
            {t("yes")}
          </ButtonSimple>
        </div>
      </Drawer>
    </div>
  );
};

export default RecipePage;
