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

  const [showPopup, setShowPopup] = useState(false);
  const { token, fullUserData, refreshUserData, signOut} = useSession();
  const {theme} = fullUserData || {};

  const updateProfileMutation = useUpdateProfile({
    token: token || "",
    onSuccess: async () => {
      await refreshUserData();
    },
  });

  const handleLogout = () => {
    setShowPopup(!showPopup);
    // signOut();
  };

  const handleThemeToggle = () => {
    
    const newTheme = theme === "dark" ? "light" : "dark";
    updateProfileMutation.mutate({ theme: newTheme});
  };

  console.log(fullUserData);

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
          <button className={style.menuButton}>
            <span className={style.menuIcon}><NotificationIcon /></span>
            <span className={style.menuTitle}>Сповіщення</span>
            <PlayArrowIcon />
          </button>

          <button className={style.menuButton}>
            <span className={style.menuIcon}><HelpCenterIcon /></span>
            <span className={style.menuTitle}>Центр допомоги</span>
            <PlayArrowIcon />
          </button>

          <button className={style.menuButton}>
            <span className={style.menuIcon}><PrivacyIcon /></span>
            <span className={style.menuTitle}>Конфіденційність</span>
            <PlayArrowIcon />
          </button>

          <button className={style.menuButton}>
            <span className={style.menuIcon}>
            <LanguageIcon />
            </span>
            <span className={style.menuTitle}>Мова</span> 
            <PlayArrowIcon />
          </button>

          <button className={style.menuButton} onClick={handleThemeToggle}>
            <span className={style.menuIcon}>
            <TurnThemeIcon />
            </span>
            <span className={style.menuTitle}>Тема</span>
          </button>

          <button onClick={handleLogout} className={style.menuButton}>
            <span className={style.menuIcon}><LogOutIcon /></span> 
            <span className={style.menuTitle}>Вийти</span>             
          </button>

        </div>
        
        
        <Drawer direction="bottom" isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <div>Test Drawer Content</div>
          <p>Are you sure you want to log out?</p>
          <div>
            <button>Yes</button>
            <button>No</button>
          </div>
        </Drawer>
    </div>
  );
};

export default ProfilePage;
