import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import LoginForm from "../../shared/components/auth/LoginForm";
import style from "./Auth.module.scss";

export default function LoginPage() {
  return (
    <AuthLayout title="Вхід">
      <LoginForm />
      <div className={style.links}>
        <NavLink to="/signup">Зареєструватися</NavLink>
        <NavLink to="/forgot-password">Забули пароль?</NavLink>
      </div>
    </AuthLayout>
  );
}
