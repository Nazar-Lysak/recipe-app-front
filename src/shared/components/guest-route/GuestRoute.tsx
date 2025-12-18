import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../../context/useSession";

const GuestRoute: FC = () => {
  const { loggedIn } = useSession();

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default GuestRoute;
