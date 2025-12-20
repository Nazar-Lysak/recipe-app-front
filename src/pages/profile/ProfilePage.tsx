import { useState } from "react";
import { useSession } from "../../context/useSession";
import LogOutIcon from "../../assets/img/svg/LogOutIcon";
import TurnThemeIcon from "../../assets/img/svg/TurnThemeIcon";
import LanguageIcon from "../../assets/img/svg/LanguageIcon";
import PrivacyIcon from "../../assets/img/svg/PrivacyIcon";
import HelpCenterIcon from "../../assets/img/svg/HelpCenterIcon";
import NotificationIcon from "../../assets/img/svg/NotificationIcon";
import PlayArrowIcon from "../../assets/img/svg/PlayArrowIcon";
import axios from "axios";
import style from "./ProfilePage.module.scss";
import Drawer from "../../shared/components/drawer/Drawer";
import ButtonSimple from "../../shared/ui/button-simple/ButtonSimple";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import ProfileIcon from "../../assets/img/svg/ProfileIcon";

const ProfilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      setImgPreview(base64data);
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;

    previewFile(file);
    setFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !imgPreview) return;

    const recipeData = {
      recipe: {
        image: imgPreview,
      },
    };

    const result = await axios
      .put(
        "http://localhost:3000/recipe/6a54452f-87c6-47ed-b199-254ec9515ae0",
        recipeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljNjA5ODc3LWIyZDEtNGI5MC1hMjFlLTQ0NDEyNTY1YTQ0NCIsImVtYWlsIjoibWFyaWEua292YWxAZ21haWwuY29tIiwidXNlcm5hbWUiOiJNYXJpYUsiLCJpYXQiOjE3NjU3MjA3NTYsImV4cCI6MTc2NjMyNTU1Nn0.cc9L3YQxUxQYOIwTTdHzDobS7W4G_IKX0wA3yxm-QZY",
          },
        },
      )
      .then((response) => {
        console.log("File uploaded successfully", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file", error);
      });

    console.log(result);
  };

  //================== Settings Menu Handlers =================//

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { signOut } = useSession();
  const { t } = useTranslation("profile");

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  return (
    <div>
      {/* <div>
        {imgPreview && (
          <div>
            <button
              onClick={() => {
                setImgPreview(null);
                setFile(null);
              }}
            >
              remove
            </button>
            <img
              src={imgPreview}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleChange}
            accept="image/jpeg, image/png, image/webp"
          />
          <button type="submit">Submit</button>
        </form>
      </div> */}

      <div className={style.settingsMenu}>

        <Link className={style.menuButton} to={"/edit-profile"}>
          <span className={style.menuIcon}>
            <ProfileIcon />
          </span>
          <span className={style.menuTitle}>{t("editProfile")}</span>
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
