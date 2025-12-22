import { useState } from "react";
import styles from "./RatingStars.module.scss";
import RatingStarIcon from "../../../assets/img/svg/RatingStarIcon";

interface RatingStarsProps {
  rating?: number;
  theme?: "light" | "red";
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "small" | "medium" | "large";
  error?: boolean;
}

const RatingStars = ({
  rating = 0,
  onRatingChange,
  readonly = false,
  size = "medium",
  theme = "red",
  error = false,
}: RatingStarsProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleClick = (star: number) => {
    if (readonly) return;
    setSelectedRating(star);
    onRatingChange?.(star);
  };

  const handleMouseEnter = (star: number) => {
    if (readonly) return;
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating || selectedRating;

  return (
    <div className={`${styles.container} ${styles[size]} ${error ? styles.error : ""}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.star}  ${styles[theme]} ${
            star <= displayRating ? styles.filled : styles.empty
          } ${readonly ? styles.readonly : ""}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
        >
          <RatingStarIcon />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
