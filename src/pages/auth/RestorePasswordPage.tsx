import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/forms/auth/AuthLayout";
import style from "./Auth.module.scss";
import RestorePassword from "../../shared/components/forms/auth/RestorePasswordForm";

export default function RestorePasswordPage() {
  return (
    <AuthLayout title="Відновлення пароля">
      <RestorePassword />
      <div className={style.links}>
        <NavLink to="/forgot-password">Забули пароль?</NavLink>
        <NavLink to="/login">Увійти</NavLink>
      </div>
    </AuthLayout>
  );
}
