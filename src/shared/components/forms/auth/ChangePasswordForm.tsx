import { useState } from "react";
import Button from "../../../ui/button/Button";
import InputText from "../../../ui/input-text/InputText";
import { useSession } from "../../../../context/useSession";
import Popup from "../../popup/Popup";
import SadSmile from "../../../../assets/img/svg/SadSmile";
import { Link } from "react-router";
import CheckIcon from "../../../../assets/img/svg/CheckIcon";
import ButtonSimple from "../../../ui/button-simple/ButtonSimple";
import { useTranslation } from "react-i18next";
import style from "./form.module.scss";
import { useChangePassword } from "../../../hooks/mutations/useChangePassword";

const ChangePasswordForm = () => {
  const { token } = useSession();
  const { t } = useTranslation("profile");

  const [formData, setFormData] = useState({
    currentPassword: "",
    confirmNewPassword: "",
    newPassword: "",
  });

  const changePasswordMutation = useChangePassword({ token });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    changePasswordMutation.mutate(formData);
  };

  const isFormValid = (): boolean => {
    return (
      formData.currentPassword !== "" &&
      formData.newPassword !== "" &&
      formData.confirmNewPassword !== "" &&
      formData.newPassword === formData.confirmNewPassword
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.container}>
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
        <div className={style.buttonWrapper}>
          <Button type="submit" disabled={!isFormValid()}>
            {t("changePasswordForm.submitButton")}
          </Button>
        </div>
      </form>
      {changePasswordMutation.isSuccess && (
        <Popup
          isOpen={changePasswordMutation.isSuccess}
          onClose={() => changePasswordMutation.reset()}
          variant="success"
        >
          <h2>{t("changePasswordForm.successTitle")}</h2>
          <CheckIcon />
          <Link to="/profile">{t("changePasswordForm.backToProfile")}</Link>
        </Popup>
      )}

      {changePasswordMutation.isError && (
        <Popup
          isOpen={changePasswordMutation.isError}
          onClose={() => changePasswordMutation.reset()}
          variant="error"
        >
          <h2>{t("changePasswordForm.errorTitle")}</h2>
          <SadSmile />
          <p>
            {(changePasswordMutation.error as any)?.response?.data?.message ||
              t("changePasswordForm.tryAgain")}
          </p>
          <ButtonSimple onClick={() => changePasswordMutation.reset()}>
            {t("changePasswordForm.tryAgain")}
          </ButtonSimple>
        </Popup>
      )}
    </>
  );
};

export default ChangePasswordForm;
