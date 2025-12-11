import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import ForgotPasswordForm from "../../shared/components/auth/ForgotPasswordForm";
import style from './Auth.module.scss'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot Password">
      <ForgotPasswordForm />
      <div className={style.links}>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>      
    </AuthLayout>
  );
}