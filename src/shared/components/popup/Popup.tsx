import { motion, AnimatePresence } from "framer-motion";
import style from "./Popup.module.scss";
import type { ReactNode } from "react";
import classNames from "classnames";

interface PopupProps {
  isOpen: boolean;
  variant?: "success" | "error" | "info" | "warning";
  onClose: () => void;
  children: ReactNode;
}

const Popup = ({ isOpen, onClose, children, variant = "info" }: PopupProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={style.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={classNames({
              [style.popup]: true,
              [style[variant]]: true,
            })}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
