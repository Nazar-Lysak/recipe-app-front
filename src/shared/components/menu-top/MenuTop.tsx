import type { FC } from "react";
import { useEffect, useRef } from "react";
import style from "./MenuTop.module.scss";
import type { Category } from "../../types/recipe.types";

interface MenuTopProps {
  elements: Category[];
  handleCategoryClick: (category: string) => void;
  activeCategory: string | null;
}

const MenuTop: FC<MenuTopProps> = ({
  elements,
  handleCategoryClick,
  activeCategory,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeButtonRef.current && menuRef.current) {
      const button = activeButtonRef.current;
      const menu = menuRef.current;

      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const menuWidth = menu.offsetWidth;

      const scrollTo = buttonLeft - menuWidth / 2 + buttonWidth / 2;

      menu.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  const classNames = (base: string, isActive: boolean) =>
    isActive ? `${base} ${style.active}` : base;

  return (
    <ul className={style.menu} ref={menuRef}>
      {elements.map((el) => (
        <li key={el.id}>
          <button
            ref={activeCategory === el.id ? activeButtonRef : null}
            className={classNames(style.item, activeCategory === el.id)}
            onClick={() => handleCategoryClick(el.id)}
            aria-pressed={activeCategory === el.id}
          >
            {el.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuTop;
