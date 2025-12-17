import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import SignupForm from "../../shared/components/auth/SignupForm";
import style from "./Auth.module.scss";

export default function SignupPage() {
  return (
    <AuthLayout title="Реєстрація">
      <SignupForm />
      <div className={style.links}>
        <NavLink to="/login">Увійти</NavLink>
        <NavLink to="/forgot-password">Забули пароль?</NavLink>
      </div>
    </AuthLayout>
  );
}
