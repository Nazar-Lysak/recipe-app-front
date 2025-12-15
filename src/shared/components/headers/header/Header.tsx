import type { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import NotificationIcon from "../../../../assets/img/svg/NotificationIcon";
import SearchIcon from "../../../../assets/img/svg/SearchIcon";
import ButtonIcon from "../../../ui/button-icon/ButtonIcon";
import style from "./Header.module.scss";
import { useSession } from "../../../../context/SessionContext";
import ArrowBackIcon from "../../../../assets/img/svg/ArrowBackIcon";

const ROUTE_TITLES: Record<string, string> = {
  "/home": "",
  "/categories": "Категорії",
  "/community": "Спільнота",
  "/profile": "Профіль",
  "/recipe": "Рецепт",
  "/user": "Користувач",
};

const backButtonAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

const titleAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

const Header: FC = () => {
  const { fullUserData } = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentRoute = () => {
    return Object.keys(ROUTE_TITLES).find((path) =>
      location.pathname.startsWith(path),
    );
  };

  const stepBack = () => {
    navigate(-1);
  };

  const currentRoute = getCurrentRoute();
  const isHome = currentRoute === "/home";
  const showSearch = currentRoute && currentRoute !== "/home";

  return (
    <header className={style.wrapper}>
      <AnimatePresence mode="wait">
        {showSearch && (
          <motion.div {...backButtonAnimation}>
            <ButtonIcon
              onClick={stepBack}
              style={{ backgroundColor: "transparent" }}
            >
              <ArrowBackIcon />
            </ButtonIcon>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div key={currentRoute} {...titleAnimation}>
          {isHome ? (
            <>
              <h1 className={style.title}>Привіт! {fullUserData?.username}</h1>
              <p className={style.subtitle}>Що ти сьогодні готуєш?</p>
            </>
          ) : (
            currentRoute && (
              <h1 className={style.title}>{ROUTE_TITLES[currentRoute]}</h1>
            )
          )}
        </motion.div>
      </AnimatePresence>
      <div className={style.buttons}>
        <ButtonIcon>
          <NotificationIcon />
        </ButtonIcon>
        <ButtonIcon>
          <SearchIcon />
        </ButtonIcon>
      </div>
    </header>
  );
};

export default Header;
