import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Button from "../../ui/button/Button";
import InputText from "../../ui/input-text/InputText";
import style from "./form.module.scss";
import PagePrealoader from "../../ui/page-prealoader/PagePrealoader";
import axios, { AxiosError } from "axios";
import Popup from "../popup/Popup";
import CheckIcon from "../../../assets/img/svg/CheckIcon";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface PasswordInterface {
  pass1: string;
  pass2: string;
}

const RestorePasswordForm = () => {
  const { t } = useTranslation("auth");
  const [password, setPassword] = useState<PasswordInterface>({
    pass1: "",
    pass2: "",
  });
  const token = new URLSearchParams(window.location.search).get("token") || "";

  const restorePasswordMutation = useMutation<
    unknown,
    AxiosError<{ message: string }>,
    { token: string; password: string }
  >({
    mutationFn: async (data: { token: string; password: string }) => {
      return axios.post("http://localhost:3000/user/restore-password", data);
    },
    onSuccess: (_) => {},
    onError: (error) => {
      console.error("Error restoring password:", error);
    },
  });

  const handleInput = (field: keyof PasswordInterface, value: string) => {
    setPassword((prev) => ({ ...prev, [field]: value }));
  };

  const buttonSubmitValidate = (): boolean => {
    const { pass1, pass2 } = password;
    return pass1.length > 0 && pass1 === pass2;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    restorePasswordMutation.mutate({ token: token, password: password.pass1 });
  };

  return (
    <form className={style.container} onSubmit={submit}>
      <InputText
        label={t("restorePassword.newPassword")}
        type="password"
        value={password.pass1}
        onChange={(e) => handleInput("pass1", e.target.value)}
        placeholder={t("restorePassword.newPasswordPlaceholder")}
      />
      <InputText
        label={t("restorePassword.confirmPassword")}
        type="password"
        value={password.pass2}
        onChange={(e) => handleInput("pass2", e.target.value)}
        placeholder={t("restorePassword.confirmPasswordPlaceholder")}
      />
      {restorePasswordMutation.isError && (
        <p className={style.error}>
          {restorePasswordMutation.error?.response?.data?.message ||
            t("restorePassword.error.message")}
        </p>
      )}
      <div className={style.buttonWrapper}>
        <Button type="submit" disabled={!buttonSubmitValidate()}>
          {restorePasswordMutation.isPending
            ? t("restorePassword.loading")
            : t("restorePassword.submitButton")}
        </Button>
      </div>

      <AnimatePresence>
        {restorePasswordMutation.isPending && (
          <PagePrealoader variant={"transparent"} />
        )}
      </AnimatePresence>
      {restorePasswordMutation.isError && (
        <Popup onClose={() => {}} isOpen={true}>
          <h2>{t("restorePassword.error.title")}</h2>
          <CheckIcon />
          <p>
            {restorePasswordMutation.error?.response?.data?.message ||
              t("restorePassword.error.message")}
          </p>
          <Link to="/forgot-password">
            {t("restorePassword.error.resendLink")}
          </Link>
        </Popup>
      )}
      {restorePasswordMutation.isSuccess && (
        <Popup onClose={() => {}} isOpen={true}>
          <h2>{t("restorePassword.success.title")}</h2>
          <CheckIcon />
          <Link to="/login">{t("restorePassword.success.backToLogin")}</Link>
        </Popup>
      )}
    </form>
  );
};

export default RestorePasswordForm;
