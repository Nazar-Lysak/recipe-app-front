import { useState } from "react";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../../../context/useSession";
import axios from "axios";
import Popup from "../popup/Popup";
import SadSmile from "../../../assets/img/svg/SadSmile";
import { Link } from "react-router";
import CheckIcon from "../../../assets/img/svg/CheckIcon";
import ButtonSimple from "../../ui/button-simple/ButtonSimple";
import { useTranslation } from "react-i18next";

const ChangePasswordForm = () => {
  const { token } = useSession();
  const { t } = useTranslation("profile");

  const [formData, setFormData] = useState({
    currentPassword: "",
    confirmNewPassword: "",
    newPassword: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    changePasswordMutation.mutate();
  };

  const isFormValid = (): boolean => {
    return (
      formData.currentPassword !== "" &&
      formData.newPassword !== "" &&
      formData.confirmNewPassword !== "" &&
      formData.newPassword === formData.confirmNewPassword
    );
  };

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `http://localhost:3000/user/current/password`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
    },
    onError: (error: any) => {
      console.error(error.response?.data.message);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputText
          label={t("changePasswordForm.currentPassword")}
          type="password"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          required
        />
        <InputText
          label={t("changePasswordForm.newPassword")}
          type="password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          required
        />
        <InputText
          label={t("changePasswordForm.confirmNewPassword")}
          type="password"
          value={formData.confirmNewPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmNewPassword: e.target.value })
          }
          required
        />
        <Button type="submit" disabled={!isFormValid()}>
          {t("changePasswordForm.submitButton")}
        </Button>
      </form>
      {changePasswordMutation.isSuccess && (
      <Popup isOpen={changePasswordMutation.isSuccess} onClose={() => changePasswordMutation.reset()} variant="success">
        <h2>{t("changePasswordForm.successTitle")}</h2>
        <CheckIcon />
        <Link to="/profile">{t("changePasswordForm.backToProfile")}</Link>
      </Popup>
      )}

      {changePasswordMutation.isError && (
      <Popup isOpen={changePasswordMutation.isError} onClose={() => changePasswordMutation.reset()} variant="error">
        <h2>{t("changePasswordForm.errorTitle")}</h2>
        <SadSmile />
        <p>{changePasswordMutation.error?.response?.data?.message || t("changePasswordForm.tryAgain")}</p>
        <ButtonSimple onClick={() => changePasswordMutation.reset()}>{t("changePasswordForm.tryAgain")}</ButtonSimple>
      </Popup>
      )}
    </>
  );
};

export default ChangePasswordForm;
