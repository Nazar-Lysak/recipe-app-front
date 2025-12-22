import { useParams, useNavigate } from "react-router-dom";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import style from "./LeaveReview.module.scss";
import RatingStars from "../../shared/components/rating-stars/RatingStars";
import TextArea from "../../shared/ui/text-area/TextArea";
import ButtonSimple from "../../shared/ui/button-simple/ButtonSimple";
import { convertImageToBase64 } from "../../shared/utils/converImageToBase64";
import { useState } from "react";
import AddIcon from "../../assets/img/svg/AddIcon";
import { useSession } from "../../context/useSession";
import Popup from "../../shared/components/popup/Popup";
import SadSmile from "../../assets/img/svg/SadSmile";
import CheckIcon from "../../assets/img/svg/CheckIcon";
import { useCreateReview } from "../../shared/hooks/mutations/useCreateReview";

interface ReviewSubmitInterface {
  rating: number;
  comment: string;
  image?: string | null;
}

const LeaveReviewPage = () => {
  const [ratingError, setRatingError] = useState(false);
  const [reviewSubmit, setReviewSubmit] = useState<ReviewSubmitInterface>(
    () => ({
      rating: 0,
      comment: "",
      image: null,
    }),
  );
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { token } = useSession();
  const recipe = useRecipe(recipeId || "");
  const { image, name } = recipe.data || {};

  const createReviewMutation = useCreateReview({
    token: token,
    data: reviewSubmit,
    recipeId: recipeId || "",
    onSuccess: () => {
      console.log("Review created successfully");
    },
  });

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReviewSubmit((prev) => ({ ...prev, comment: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    convertImageToBase64(file, (base64Image) => {
      setReviewSubmit((prev) => ({ ...prev, image: base64Image }));
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewSubmit.rating === 0) {
      setRatingError(true);
      return;
    }

    setRatingError(false);
    createReviewMutation.mutate(reviewSubmit);
  };

  const handleSuccessClose = () => {
    navigate(`/recipe-review/${recipeId}`);
  };

  if (recipe.isLoading) {
    return <div>Завантаження...</div>;
  }

  if (recipe.isError) {
    return <div>Помилка завантаження рецепту.</div>;
  }

  return (
    <div>
      <header className={style.header}>
        <img src={image || ""} alt={name || ""} />
        <h2 className={style.title}>{name}</h2>
      </header>
      <div className={style.ratingContainer}>
        <RatingStars
          size="large"
          rating={reviewSubmit.rating}
          error={ratingError}
          onRatingChange={(rating) => {
            setReviewSubmit((prev) => ({ ...prev, rating }));
            setRatingError(false);
          }}
        />
        <p className={style.ratingText}>Ваша загальна оцінка</p>
        {ratingError && (
          <p className={style.errorText}>Будь ласка, виберіть оцінку</p>
        )}
      </div>
      <form className={style.reviewForm} onSubmit={submitForm}>
        <TextArea
          placeholder="Leave us Review!"
          rows={6}
          required
          value={reviewSubmit.comment}
          onChange={handleTextArea}
        />

        <label className={style.editPhotoButton}>
          <AddIcon />
          Додати фото
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg, image/png, image/webp"
          />
        </label>
        {reviewSubmit.image && (
          <img
            className={style.uploadedImage}
            src={reviewSubmit.image}
            alt="Uploaded Review"
          />
        )}
        {reviewSubmit.image && (
          <div className={style.removePhotoButton}>
            <ButtonSimple
              variant="link"
              onClick={() =>
                setReviewSubmit((prev) => ({ ...prev, image: null }))
              }
            >
              Видалити фото
            </ButtonSimple>
          </div>
        )}
        <div className={style.buttonsContainer}>
          <ButtonSimple isActive onClick={handleSuccessClose}>
            Скасувати
          </ButtonSimple>
          <ButtonSimple variant="primary" type="submit">
            Надіслати
          </ButtonSimple>
        </div>
      </form>
      <Popup
        onClose={() => createReviewMutation.reset()}
        isOpen={createReviewMutation.isError}
        variant="error"
      >
        <h2>Щось пішло не так</h2>
        <SadSmile />
        {createReviewMutation.error?.response?.data?.message ? (
          <p>{createReviewMutation.error.response.data.message}</p>
        ) : (
          <p>Не вдалося надіслати відгук. Спробуйте ще раз.</p>
        )}
        <ButtonSimple onClick={() => createReviewMutation.reset()}>
          Close
        </ButtonSimple>
      </Popup>
      <Popup
        onClose={handleSuccessClose}
        isOpen={createReviewMutation.isSuccess}
        variant="success"
      >
        <h2>Відгук надіслано успішно</h2>
        <CheckIcon />
        <p>Дякуємо за ваш відгук!</p>
        <ButtonSimple onClick={handleSuccessClose}>Ok</ButtonSimple>
      </Popup>
    </div>
  );
};

export default LeaveReviewPage;
