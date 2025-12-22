import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "../../context/useSession";
import Button from "../../shared/ui/button/Button";
import InputText from "../../shared/ui/input-text/InputText";
import TextArea from "../../shared/ui/text-area/TextArea";
import ToggleSwitch from "../../shared/ui/toggle-switch/ToggleSwitch";
import PagePrealoader from "../../shared/ui/page-prealoader/PagePrealoader";
import style from "./EditProfile.module.scss";
import type { FullUserDataInterface } from "../../shared/types/UI.types";
import { useUpdateProfile } from "../../shared/hooks/mutations/useUpdateProfile";
import Popup from "../../shared/components/popup/Popup";
import CheckIcon from "../../assets/img/svg/CheckIcon";
import { Link } from "react-router";
import SadSmile from "../../assets/img/svg/SadSmile";
import { convertImageToBase64 } from "../../shared/utils/converImageToBase64";

const EditProfile = () => {
  const { t } = useTranslation("profile");
  const { t: tCommon } = useTranslation("common");
  const { fullUserData, refreshUserData, token } = useSession();
  const [uploadImage, setUploadImage] = useState<string | null>(null);
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

  const handleFieldChange = (field: string, value: string | boolean) => {
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

    const profileData = { ...userData };

    if (uploadImage) {
      profileData.avatar_url = uploadImage;
    } else {
      delete profileData.avatar_url;
    }

    updateProfileMutation.mutate(profileData);
  };

  const updateProfileMutation = useUpdateProfile({
    token: token || "",
    onSuccess: async () => {
      //   setTimeout(async () => {
      //     await refreshUserData();
      //   }, 700);
    },
  });

  const refreshUserDataHandler = async () => {
    await refreshUserData();
  };

  const getAvatarUrl = () => {
    if (uploadImage) {
      return uploadImage;
    }

    return avatar_url || "";
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    convertImageToBase64(file, (base64Image) => {
      setUploadImage(base64Image);
    });
  };

  return (
    <div>
      <h2 className={style.username}>{username}</h2>
      <p className={style.email}>{email}</p>
      <img className={style.avatar} src={getAvatarUrl()} alt="User Avatar" />
      <label className={style.editPhotoButton}>
        {t("editProfileForm.editPhoto")}
        <input
          type="file"
          onChange={handleAvatarChange}
          accept="image/jpeg, image/png, image/webp"
        />
      </label>
      <form className={style.form} onSubmit={handleSubmit}>
        <InputText
          label={t("editProfileForm.firstName")}
          placeholder={t("editProfileForm.firstNamePlaceholder")}
          required
          value={first_name || ""}
          onChange={(e) => handleFieldChange("first_name", e.target.value)}
        />
        <InputText
          label={t("editProfileForm.lastName")}
          placeholder={t("editProfileForm.lastNamePlaceholder")}
          required
          value={last_name || ""}
          onChange={(e) => handleFieldChange("last_name", e.target.value)}
        />
        <TextArea
          label={t("editProfileForm.bio")}
          placeholder={t("editProfileForm.bioPlaceholder")}
          required
          value={bio || ""}
          onChange={(e) => handleFieldChange("bio", e.target.value)}
        />
        <InputText
          label={t("editProfileForm.location")}
          placeholder={t("editProfileForm.locationPlaceholder")}
          value={location || ""}
          onChange={(e) => handleFieldChange("location", e.target.value)}
        />
        <InputText
          label={t("editProfileForm.website")}
          placeholder={t("editProfileForm.websitePlaceholder")}
          value={website || ""}
          onChange={(e) => handleFieldChange("website", e.target.value)}
        />
        <InputText
          label="Instagram"
          placeholder={t("editProfileForm.instagramPlaceholder")}
          value={instagram || ""}
          onChange={(e) => handleFieldChange("instagram", e.target.value)}
        />
        <InputText
          label="TikTok"
          placeholder={t("editProfileForm.tiktokPlaceholder")}
          value={tiktok || ""}
          onChange={(e) => handleFieldChange("tiktok", e.target.value)}
        />
        <InputText
          label="Facebook"
          placeholder={t("editProfileForm.facebookPlaceholder")}
          value={facebook || ""}
          onChange={(e) => handleFieldChange("facebook", e.target.value)}
        />
        <InputText
          label="YouTube"
          placeholder={t("editProfileForm.youtubePlaceholder")}
          value={youtube || ""}
          onChange={(e) => handleFieldChange("youtube", e.target.value)}
        />
        <ToggleSwitch
          label={t("editProfileForm.showProfile")}
          checked={Boolean(is_private)}
          onChange={() => handleFieldChange("is_private", Boolean(!is_private))}
        />
        <Button style={{ margin: "0 auto" }} type="submit">
          {t("editProfileForm.saveChanges")}
        </Button>
      </form>
      {updateProfileMutation.isPending && (
        <PagePrealoader variant="transparent" />
      )}
      <Popup
        isOpen={updateProfileMutation.isSuccess}
        onClose={() => {}}
        variant="success"
      >
        <h2 className={style.popupTitle}>
          {tCommon("popup.success.profileUpdated")}
        </h2>
        <CheckIcon />
        <p className={style.popupText}>
          {tCommon("popup.success.profileUpdatedMessage")}
        </p>
        <Link to="/edit-profile" onClick={refreshUserDataHandler}>
          {tCommon("popup.success.backToProfile")}
        </Link>
      </Popup>
      <Popup
        isOpen={updateProfileMutation.isError}
        onClose={() => {}}
        variant="error"
      >
        <h2 className={style.popupTitle}>{tCommon("popup.error.title")}</h2>
        <SadSmile />
        <p className={style.popupText}>
          {tCommon("popup.error.saveFailedMessage")}
        </p>
        <Link to="/profile" className={style.popupLink}>
          {tCommon("popup.error.backToProfile")}
        </Link>
      </Popup>
    </div>
  );
};

export default EditProfile;
