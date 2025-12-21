import { useState } from "react";
import { useSession } from "../../context/useSession";
import LogOutIcon from "../../assets/img/svg/LogOutIcon";
import TurnThemeIcon from "../../assets/img/svg/TurnThemeIcon";
import LanguageIcon from "../../assets/img/svg/LanguageIcon";
import PrivacyIcon from "../../assets/img/svg/PrivacyIcon";
import HelpCenterIcon from "../../assets/img/svg/HelpCenterIcon";
import NotificationIcon from "../../assets/img/svg/NotificationIcon";
import PlayArrowIcon from "../../assets/img/svg/PlayArrowIcon";
import style from "./ProfilePage.module.scss";
import Drawer from "../../shared/components/drawer/Drawer";
import ButtonSimple from "../../shared/ui/button-simple/ButtonSimple";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import ProfileIcon from "../../assets/img/svg/ProfileIcon";
import PasswordIcon from "../../assets/img/svg/PasswordIcon";

const ProfilePage = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { signOut } = useSession();
  const { t } = useTranslation("profile");

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  return (
    <div>
      <div className={style.settingsMenu}>
        <Link className={style.menuButton} to={"/edit-profile"}>
          <span className={style.menuIcon}>
            <ProfileIcon />
          </span>
          <span className={style.menuTitle}>{t("editProfile")}</span>
          <PlayArrowIcon />
        </Link>
        <Link className={style.menuButton} to={"/edit-password"}>
          <span className={style.menuIcon}>
            <PasswordIcon />
          </span>
          <span className={style.menuTitle}>{t("editPassword")}</span>
          <PlayArrowIcon />
        </Link>
        <Link className={style.menuButton} to={"/notification-settings"}>
          <span className={style.menuIcon}>
            <NotificationIcon />
          </span>
          <span className={style.menuTitle}>{t("notifications")}</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/help-center"}>
          <span className={style.menuIcon}>
            <HelpCenterIcon />
          </span>
          <span className={style.menuTitle}>{t("support")}</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/privacy-policy"}>
          <span className={style.menuIcon}>
            <PrivacyIcon />
          </span>
          <span className={style.menuTitle}>{t("privacy")}</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/language-selection"}>
          <span className={style.menuIcon}>
            <LanguageIcon />
          </span>
          <span className={style.menuTitle}>{t("language")}</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/theme-settings"}>
          <span className={style.menuIcon}>
            <TurnThemeIcon />
          </span>
          <span className={style.menuTitle}>{t("theme")}</span>
          <PlayArrowIcon />
        </Link>

        <button onClick={handleLogout} className={style.menuButton}>
          <span className={style.menuIcon}>
            <LogOutIcon />
          </span>
          <span className={style.menuTitle}>{t("logout")}</span>
        </button>
      </div>

      <Drawer
        direction="bottom"
        isOpen={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
      >
        <h3>Підтвердження виходу</h3>
        <p>Ви впевнені, що хочете вийти?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <ButtonSimple onClick={() => setShowLogoutPopup(false)}>
            Ні
          </ButtonSimple>
          <ButtonSimple isActive={true} onClick={signOut}>
            Так
          </ButtonSimple>
        </div>
      </Drawer>
    </div>
  );
};

export default ProfilePage;
