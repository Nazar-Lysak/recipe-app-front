import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../../context/useSession";

const ProtectedRoutes: FC = () => {
  const { loggedIn } = useSession();

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
