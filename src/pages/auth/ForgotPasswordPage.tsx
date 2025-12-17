import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import ForgotPasswordForm from "../../shared/components/auth/ForgotPasswordForm";
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
