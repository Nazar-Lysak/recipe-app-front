import RatingStars from "../rating-stars/RatingStars";

import style from "./Comment.module.scss";

const Comment = () => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <img
          src="https://res.cloudinary.com/dohg7oxwo/image/upload/v1766252531/avatars/enha8ylzxsgxaoggvtqi.webp"
          alt=""
        />
        <p className={style.username}>@r_joshua</p>
        <p className={style.time}>(15 min ago)</p>
      </header>
      <div>
        <p className={style.text}>
          This recipe was absolutely delicious! The flavors were perfectly
          balanced, and the instructions were easy to follow. I will definitely
          be making this again.
        </p>
      </div>
      <RatingStars rating={4} readonly size="small" />
    </div>
  );
};

export default Comment;
