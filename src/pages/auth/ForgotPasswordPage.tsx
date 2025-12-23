import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/forms/auth/AuthLayout";
import ForgotPasswordForm from "../../shared/components/forms/auth/ForgotPasswordForm";
import style from "./Auth.module.scss";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Відновлення паролю">
      <ForgotPasswordForm />
      <div className={style.links}>
        <NavLink to="/login">Увійти</NavLink>
        <NavLink to="/signup">Зареєструватися</NavLink>
      </div>
    </AuthLayout>
  );
}
