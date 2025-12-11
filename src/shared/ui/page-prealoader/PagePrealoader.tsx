import { motion } from "framer-motion";

import logo from "../../../assets/img/logo.svg";
import style from "./PagePreloader.module.scss";

import type { FC } from "react";

const PagePrealoader: FC = () => {
  return (
    <motion.div
      className={style.preloader}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.img
        src={logo}
        alt="logo"
        height="252"
        width="307"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default PagePrealoader;
