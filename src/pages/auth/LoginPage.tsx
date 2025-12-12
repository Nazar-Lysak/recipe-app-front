import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import LoginForm from "../../shared/components/auth/LoginForm";
import style from "./Auth.module.scss";

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
      <div className={style.links}>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
      </div>
    </AuthLayout>
  );
}
