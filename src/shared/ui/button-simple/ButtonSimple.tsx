import style from "./ButtonSimple.module.scss";
import classNames from "classnames";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  isActive?: boolean;
  variant?: "primary" | "light";
}

const ButtonSimple = ({ children, isActive, variant = "primary", ...rest }: ButtonProps) => {
  return (
    <motion.button
      {...rest}
      className={classNames(style.buttonSimple, { [style.active]: isActive, [style[variant]]: variant })}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default ButtonSimple;
