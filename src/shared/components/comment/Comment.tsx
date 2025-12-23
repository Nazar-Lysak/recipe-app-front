import DateObject from "react-date-object";
import RatingStars from "../rating-stars/RatingStars";

import style from "./Comment.module.scss";

const Comment = ({ review }: { review: any }) => {
  const { comment, rating, user, createdAt, image } = review;

  const recipeDate = new DateObject(createdAt);
  return (
    <div className={style.container}>
      <header className={style.header}>
        <img src={user?.avatar_url || ""} alt="" />
        <p className={style.username}>{user?.user.username}</p>
        <p className={style.time}>
          ({recipeDate.format("DD MMM YYYY, HH:mm")})
        </p>
      </header>
      <div>
        <p className={style.text}>{comment}</p>
        {image && (
          <div className={style.imageContainer}>
            <img
              className={style.uploadedImage}
              src={image}
              alt={user?.user.username}
            />
          </div>
        )}
      </div>
      <RatingStars rating={rating} readonly size="small" />
    </div>
  );
};

export default Comment;
