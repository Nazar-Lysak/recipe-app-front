import { motion } from "framer-motion";
import style from "./ButtonIcon.module.scss";
import type { ButtonHTMLAttributes, ReactNode, FC } from "react";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "type"
> {
  variant?: "button" | "whiteIcon";
  active?: boolean;
  children: ReactNode;
}

const ButtonIcon: FC<ButtonProps> = ({
  children,
  variant = "button",
  active = false,
  ...rest
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      whileFocus={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`${style[variant]} ${active ? style.active : ""}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default ButtonIcon;
