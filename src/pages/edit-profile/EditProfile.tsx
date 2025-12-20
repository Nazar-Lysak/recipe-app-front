import { useState } from "react";
import { useSession } from "../../context/useSession";
import Button from "../../shared/ui/button/Button";
import InputText from "../../shared/ui/input-text/InputText";
import TextArea from "../../shared/ui/text-area/TextArea";
import ToggleSwitch from "../../shared/ui/toggle-switch/ToggleSwitch";
import style from "./EditProfile.module.scss";
import type { FullUserDataInterface } from "../../shared/types/UI.types";
import { useUpdateProfile } from "../../shared/hooks/mutations/useUpdateProfile";

const EditProfile = () => {
  const { fullUserData, refreshUserData, token } = useSession();
  const [userData, setUserData] = useState<FullUserDataInterface | null>(
    fullUserData,
  );
  const {
    username,
    email,
    first_name,
    last_name,
    bio,
    location,
    website,
    instagram,
    tiktok,
    facebook,
    youtube,
    is_private,
    avatar_url,
  } = userData || {};

  const handleChange = (field: string, value: string | boolean) => {
    setUserData((prevData) => {
      if (!prevData) return prevData;
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    updateProfileMutation.mutate(userData);
  };

  const updateProfileMutation = useUpdateProfile({
    token: token || "",
    onSuccess: async () => {
      setTimeout(async () => {
        await refreshUserData();
      }, 700);
    },
  });

  return (
    <div>
      <h2 className={style.username}>{username}</h2>
      <p className={style.email}>{email}</p>
      <img className={style.avatar} src={avatar_url || ""} alt="User Avatar" />
      <button className={style.editPhotoButton}>Edit Photo</button>
      <form className={style.form} onSubmit={handleSubmit}>
        <InputText
          label="Імя"
          placeholder="Імя користувача"
          required
          value={first_name || ""}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />
        <InputText
          label="Прізвище"
          placeholder="Прізвище користувача"
          required
          value={last_name || ""}
          onChange={(e) => handleChange("last_name", e.target.value)}
        />
        <TextArea
          label="Про мене"
          placeholder="Розкажіть щось про себе"
          required
          value={bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
        <InputText
          label="Країна/Місто"
          placeholder="Країна або місто"
          value={location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
        />
        <InputText
          label="Вебсайт"
          placeholder="https://example.com"
          value={website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
        />
        <InputText
          label="Instagram"
          placeholder="https://instagram.com/yourprofile"
          value={instagram || ""}
          onChange={(e) => handleChange("instagram", e.target.value)}
        />
        <InputText
          label="TikTok"
          placeholder="https://tiktok.com/yourprofile"
          value={tiktok || ""}
          onChange={(e) => handleChange("tiktok", e.target.value)}
        />
        <InputText
          label="Facebook"
          placeholder="https://facebook.com/yourprofile"
          value={facebook || ""}
          onChange={(e) => handleChange("facebook", e.target.value)}
        />
        <InputText
          label="YouTube"
          placeholder="https://youtube.com/yourprofile"
          value={youtube || ""}
          onChange={(e) => handleChange("youtube", e.target.value)}
        />
        <ToggleSwitch
          label="Показувати мій профіль"
          checked={Boolean(is_private)}
          onChange={() => handleChange("is_private", Boolean(!is_private))}
        />
        <Button style={{ margin: "0 auto" }} type="submit">
          Зберегти зміни
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
