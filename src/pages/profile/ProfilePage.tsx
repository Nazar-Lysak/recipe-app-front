import { useState } from "react";
import { useSession } from "../../context/useSession";
import { useUpdateProfile } from "../../shared/hooks/mutations/useUpdateProfile";
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
import { Link, useNavigate } from "react-router";

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
  const [showThemePopup, setShowThemePopup] = useState(false);
  const { token, fullUserData, refreshUserData, signOut } = useSession();
  const { theme } = fullUserData || {};
  const navigate = useNavigate();

  const updateProfileMutation = useUpdateProfile({
    token: token || "",
    onSuccess: async () => {
      await refreshUserData();
    },
  });

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleThemeToggle = () => {
    setShowThemePopup(true);
  };

  const handleThemeSelect = (
    newTheme: "light" | "dark" | "ocean" | "sunset",
  ) => {
    updateProfileMutation.mutate({ theme: newTheme });
    setShowThemePopup(false);
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
        <Link className={style.menuButton} to={"/notification-settings"}>
          <span className={style.menuIcon}>
            <NotificationIcon />
          </span>
          <span className={style.menuTitle}>Сповіщення</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/help-center"}>
          <span className={style.menuIcon}>
            <HelpCenterIcon />
          </span>
          <span className={style.menuTitle}>Центр допомоги</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/privacy-policy"}>
          <span className={style.menuIcon}>
            <PrivacyIcon />
          </span>
          <span className={style.menuTitle}>Конфіденційність</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/language-selection"}>
          <span className={style.menuIcon}>
            <LanguageIcon />
          </span>
          <span className={style.menuTitle}>Мова</span>
          <PlayArrowIcon />
        </Link>

        <Link className={style.menuButton} to={"/theme-settings"}>
          <span className={style.menuIcon}>
            <TurnThemeIcon />
          </span>
          <span className={style.menuTitle}>Тема</span>
          <PlayArrowIcon />
        </Link>

        <button onClick={handleLogout} className={style.menuButton}>
          <span className={style.menuIcon}>
            <LogOutIcon />
          </span>
          <span className={style.menuTitle}>Вийти</span>
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

      <Drawer
        direction="bottom"
        isOpen={showThemePopup}
        onClose={() => setShowThemePopup(false)}
      >
        <h3>Оберіть тему</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <ButtonSimple onClick={() => handleThemeSelect("light")}>
            ☀️ Світла
          </ButtonSimple>
          <ButtonSimple onClick={() => handleThemeSelect("dark")}>
            🌙 Темна
          </ButtonSimple>
          <ButtonSimple onClick={() => handleThemeSelect("ocean")}>
            🌊 Океан
          </ButtonSimple>
          <ButtonSimple onClick={() => handleThemeSelect("sunset")}>
            🌅 Захід сонця
          </ButtonSimple>
        </div>
      </Drawer>
    </div>
  );
};

export default ProfilePage;
