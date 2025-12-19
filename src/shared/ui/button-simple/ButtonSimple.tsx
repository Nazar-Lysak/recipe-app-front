import style from "./ButtonSimple.module.scss";
import classNames from "classnames";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  isActive?: boolean;
}

const ButtonSimple = ({ children, isActive, ...rest }: ButtonProps) => {
  return (
    <motion.button
      {...rest}
      className={classNames(style.buttonSimple, { [style.active]: isActive })}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default ButtonSimple;
