import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "../../context/useSession";
import Button from "../../shared/ui/button/Button";
import InputText from "../../shared/ui/input-text/InputText";
import TextArea from "../../shared/ui/text-area/TextArea";
import ToggleSwitch from "../../shared/ui/toggle-switch/ToggleSwitch";
import style from "./EditProfile.module.scss";
import type { FullUserDataInterface } from "../../shared/types/UI.types";
import { useUpdateProfile } from "../../shared/hooks/mutations/useUpdateProfile";

const EditProfile = () => {
  const { t } = useTranslation("profile");
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
      <button className={style.editPhotoButton}>{t("editProfileForm.editPhoto")}</button>
      <form className={style.form} onSubmit={handleSubmit}>
        <InputText
          label={t("editProfileForm.firstName")}
          placeholder={t("editProfileForm.firstNamePlaceholder")}
          required
          value={first_name || ""}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />
        <InputText
          label={t("editProfileForm.lastName")}
          placeholder={t("editProfileForm.lastNamePlaceholder")}
          required
          value={last_name || ""}
          onChange={(e) => handleChange("last_name", e.target.value)}
        />
        <TextArea
          label={t("editProfileForm.bio")}
          placeholder={t("editProfileForm.bioPlaceholder")}
          required
          value={bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
        <InputText
          label={t("editProfileForm.location")}
          placeholder={t("editProfileForm.locationPlaceholder")}
          value={location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
        />
        <InputText
          label={t("editProfileForm.website")}
          placeholder={t("editProfileForm.websitePlaceholder")}
          value={website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
        />
        <InputText
          label="Instagram"
          placeholder={t("editProfileForm.instagramPlaceholder")}
          value={instagram || ""}
          onChange={(e) => handleChange("instagram", e.target.value)}
        />
        <InputText
          label="TikTok"
          placeholder={t("editProfileForm.tiktokPlaceholder")}
          value={tiktok || ""}
          onChange={(e) => handleChange("tiktok", e.target.value)}
        />
        <InputText
          label="Facebook"
          placeholder={t("editProfileForm.facebookPlaceholder")}
          value={facebook || ""}
          onChange={(e) => handleChange("facebook", e.target.value)}
        />
        <InputText
          label="YouTube"
          placeholder={t("editProfileForm.youtubePlaceholder")}
          value={youtube || ""}
          onChange={(e) => handleChange("youtube", e.target.value)}
        />
        <ToggleSwitch
          label={t("editProfileForm.showProfile")}
          checked={Boolean(is_private)}
          onChange={() => handleChange("is_private", Boolean(!is_private))}
        />
        <Button style={{ margin: "0 auto" }} type="submit">
          {t("editProfileForm.saveChanges")}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
