import classNames from "classnames";
import type { FC, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import style from "./Drawer.module.scss";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  direction?: "bottom" | "top";
}

const Drawer: FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  direction = "bottom",
}) => {
  const variants = {
    hidden: {
      y: direction === "bottom" ? "100%" : "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: direction === "bottom" ? "100%" : "-100%",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={style.drawerBackdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={classNames(style.drawerContent, {
              [style.bottom]: direction === "bottom",
              [style.top]: direction === "top",
            })}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
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

export default Drawer;
