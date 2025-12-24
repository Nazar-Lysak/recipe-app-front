import { motion } from "framer-motion";
import type { FC } from "react";
import CategoriesIcon from "../../../assets/img/svg/CategoriesIcon";
import CommunityIcon from "../../../assets/img/svg/CommunityIcon";
import HomeIcon from "../../../assets/img/svg/HomeIcon";
import ProfileIcon from "../../../assets/img/svg/ProfileIcon";
import ChatIcon from "../../../assets/img/svg/ChatIcon";
import ButtonIcon from "../../ui/button-icon/ButtonIcon";
import style from "./BottomNavigation.module.scss";
import { Link, useLocation } from "react-router";

const NAVIGATION_ITEMS = [
  { path: "/home", icon: HomeIcon, label: "Home" },
  { path: "/community", icon: CommunityIcon, label: "Community" },
  { path: "/categories", icon: CategoriesIcon, label: "Categories" },
  { path: "/profile", icon: ProfileIcon, label: "Profile" },
  { path: "/chat", icon: ChatIcon, label: "Chat" },
] as const;

const navigationAnimation = {
  initial: { y: 120, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring" as const,
    stiffness: 100,
    damping: 35,
    delay: 0.75,
    duration: 0.3,
  },
};

const BottomNavigation: FC = () => {
  const location = useLocation();

  return (
    <motion.div {...navigationAnimation} className={style.bottomNavigation}>
      <motion.nav className={style.nav}>
        {NAVIGATION_ITEMS.map(({ path, icon: Icon, label }) => (
          <Link key={path} to={path} aria-label={label}>
            <ButtonIcon
              variant="whiteIcon"
              active={location.pathname.startsWith(path)}
              tabIndex={-1}
            >
              <Icon />
            </ButtonIcon>
          </Link>
        ))}
      </motion.nav>
    </motion.div>
  );
};

export default BottomNavigation;
