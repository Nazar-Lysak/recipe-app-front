import type { FC, ReactNode } from "react";
import style from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className={style.authWrapper}>
      <h1 className={style.title}>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
