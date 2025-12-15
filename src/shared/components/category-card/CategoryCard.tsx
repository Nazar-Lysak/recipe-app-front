import type { FC } from "react";
import style from "./CategoryCard.module.scss";

interface CategoryCardProps {
  name: string;
  image?: string;
}

const FALLBACK_IMAGE =
  "/src/assets/img/fallback-images/general-category-image.png";

const CategoryCard: FC<CategoryCardProps> = ({ name, image }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div>
      <img
        className={style.img}
        src={image || FALLBACK_IMAGE}
        alt={name}
        width={100}
        onError={handleImageError}
      />
      <h3 className={style.title}>{name}</h3>
    </div>
  );
};

export default CategoryCard;
