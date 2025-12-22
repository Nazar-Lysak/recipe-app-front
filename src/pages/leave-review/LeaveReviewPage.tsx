import { useParams } from "react-router-dom";
import { useRecipe } from "../../shared/hooks/queries/useRecipe";
import style from "./LeaveReview.module.scss";
import RatingStars from "../../shared/components/rating-stars/RatingStars";
import TextArea from "../../shared/ui/text-area/TextArea";
import ButtonSimple from "../../shared/ui/button-simple/ButtonSimple";
import { convertImageToBase64 } from "../../shared/utils/converImageToBase64";
import { useState } from "react";
import AddIcon from "../../assets/img/svg/AddIcon";

interface ReviewSubmitInterface {
  rating: number;
  reviewText: string;
  image?: string | null;
}

const LeaveReviewPage = () => {
  const [ratingError, setRatingError] = useState(false);
  const [reviewSubmit, setReviewSubmit] = useState<ReviewSubmitInterface>(
    () => ({
      rating: 0,
      reviewText: "",
      image: null,
    }),
  );
  const { recipeId } = useParams();
  const recipe = useRecipe(recipeId || "");
  const { image, name } = recipe.data || {};
















  

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReviewSubmit((prev) => ({ ...prev, reviewText: value }));
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
    console.log("Form submitted");
    console.log(reviewSubmit);
  };

    
  if (recipe.isLoading) {
    return <div>Loading...</div>;
  }

  if (recipe.isError) {
    return <div>Error loading recipe.</div>;
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
        <p className={style.ratingText}>Your overall rating</p>
        {ratingError && (
          <p className={style.errorText}>Please select a rating</p>
        )}
      </div>
      <form className={style.reviewForm} onSubmit={submitForm}>
        <TextArea
          placeholder="Leave us Review!"
          rows={6}
          required
          value={reviewSubmit.reviewText}
          onChange={handleTextArea}
        />

        <label className={style.editPhotoButton}>
          <AddIcon />
          Add Photo
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
              Remove Photo
            </ButtonSimple>
          </div>
        )}
        <div className={style.buttonsContainer}>
          <ButtonSimple isActive>Cancel</ButtonSimple>
          <ButtonSimple variant="primary" type="submit">
            Submit
          </ButtonSimple>
        </div>
      </form>
    </div>
  );
};

export default LeaveReviewPage;
