import type { FC } from "react";
import style from './CategoryCard.module.scss';

interface CategoryCardProps {
  name: string;
  image?: string;
}

const CategoryCard:FC<CategoryCardProps> = ({ name, image }) => {
    const img = image || "/src/assets/img/onboarding/onboarding-2.jpg";

    return (
        <div>
          <img className={style.img} src={img} alt={name} width={100} />
          <h3 className={style.title}>{name}</h3>
        </div>
    )
}

export default CategoryCard;
