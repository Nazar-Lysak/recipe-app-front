import { NavLink } from "react-router";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import SignupForm from "../../shared/components/auth/SignupForm";
import style from './Auth.module.scss'

export default function SignupPage() {
  return (
    <AuthLayout title="Sign Up">
      <SignupForm />
      <div className={style.links}>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
      </div>
    </AuthLayout>
  );
}