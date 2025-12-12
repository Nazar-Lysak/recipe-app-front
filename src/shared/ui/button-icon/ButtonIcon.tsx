import { motion } from "framer-motion";
import style from './ButtonIcon.module.scss'
import type { ButtonHTMLAttributes, ReactNode, FC } from "react";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "type"
> {
  variant?: 'button' | 'whiteIcon';
  children: ReactNode;
}

const ButtonIcon: FC<ButtonProps> = ({children, variant = "button", ...rest}) => {
    return (
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            whileFocus={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={style[variant]}
            {...rest}
        >
            {children}
        </motion.button>
    )
}

export default ButtonIcon;