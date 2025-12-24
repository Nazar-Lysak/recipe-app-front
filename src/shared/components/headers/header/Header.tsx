import type { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import NotificationIcon from "../../../../assets/img/svg/NotificationIcon";
import SearchIcon from "../../../../assets/img/svg/SearchIcon";
import ButtonIcon from "../../../ui/button-icon/ButtonIcon";
import style from "./Header.module.scss";
import { useSession } from "../../../../context/useSession";
import ArrowBackIcon from "../../../../assets/img/svg/ArrowBackIcon";

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
  const { t } = useTranslation("header");
  const { fullUserData } = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  const ROUTE_TITLES: Record<string, string> = {
    "/home": "",
    "/categories": t("categories"),
    "/community": t("community"),
    "/profile": t("profile"),
    "/recipe/": t("recipe"),
    "/user": t("user"),
    "/create-recipe": t("createRecipe"),
    "/notifications": t("notifications"),
    "/notification-settings": t("notificationSettings"),
    "/help-center": t("helpCenter"),
    "/privacy-policy": t("privacyPolicy"),
    "/theme-settings": t("profile:theme"),
    "/language-selection": t("profile:language"),
    "/edit-profile": t("editProfile"),
    "/edit-password": t("editPassword"),
    "/search": t("search"),
    "/recipe-review/": t("recipeReview"),
    "/leave-review/": t("leaveReview"),
    "/edit-recipe/": t("editRecipe"),
    "/chat": t("chat"),
  };

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
              <h1 className={style.title}>
                {t("greeting", { username: fullUserData?.username })}
              </h1>
              <p className={style.subtitle}>{t("subtitle")}</p>
            </>
          ) : (
            currentRoute && (
              <h1 className={style.title}>{ROUTE_TITLES[currentRoute]}</h1>
            )
          )}
        </motion.div>
      </AnimatePresence>
      <div className={style.buttons}>
        <Link to="/notifications">
          <ButtonIcon>
            <NotificationIcon />
          </ButtonIcon>
        </Link>
        <Link to="/search">
          <ButtonIcon>
            <SearchIcon />
          </ButtonIcon>
        </Link>
      </div>
    </header>
  );
};

export default Header;
