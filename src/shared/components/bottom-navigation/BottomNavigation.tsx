import { motion } from "framer-motion";
import type { FC } from "react";
import CategoriesIcon from "../../../assets/img/svg/CategoriesIcon";
import CommunityIcon from "../../../assets/img/svg/CommunityIcon";
import HomeIcon from "../../../assets/img/svg/HomeIcon";
import ProfileIcon from "../../../assets/img/svg/ProfileIcon";
import ButtonIcon from "../../ui/button-icon/ButtonIcon";
import style from "./BottomNavigation.module.scss";
import { Link, useLocation } from "react-router";

const BottomNavigation: FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 35,
        delay: 0.75,
        duration: 0.3,
      }}
      className={style.wrapper}
    >
      <motion.nav className={style.nav}>
        <Link to="/home">
          <ButtonIcon
            variant="whiteIcon"
            active={isActive("/home")}
            tabIndex={-1}
          >
            <HomeIcon />
          </ButtonIcon>
        </Link>
        <Link to="/community">
          <ButtonIcon
            variant="whiteIcon"
            active={isActive("/community")}
            tabIndex={-1}
          >
            <CommunityIcon />
          </ButtonIcon>
        </Link>
        <Link to="/categories">
          <ButtonIcon
            variant="whiteIcon"
            active={isActive("/categories")}
            tabIndex={-1}
          >
            <CategoriesIcon />
          </ButtonIcon>
        </Link>
        <Link to="/profile">
          <ButtonIcon
            variant="whiteIcon"
            active={isActive("/profile")}
            tabIndex={-1}
          >
            <ProfileIcon />
          </ButtonIcon>
        </Link>
      </motion.nav>
    </motion.div>
  );
};

export default BottomNavigation;
