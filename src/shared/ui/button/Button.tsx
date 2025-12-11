import { motion } from "framer-motion";
import style from "./Button.module.scss";
import type { ButtonHTMLAttributes, ReactNode, FC } from "react";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  className,
  ...rest
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      whileFocus={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      type={type}
      className={style.button}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
