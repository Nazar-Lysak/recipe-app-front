import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import PageTransition from "../../shared/components/page-transition/PageTransition";
import ProtectedRoutes from "../../shared/components/protected-route/ProtectedRoute";
import GuestRoute from "../../shared/components/guest-route/GuestRoute";
import RootLayout from "../../shared/components/root-layout/RootLayout";

const LoginPage = lazy(() => import("../../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../../pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(
  () => import("../../pages/auth/ForgotPasswordPage"),
);
const LandingPage = lazy(() => import("../../pages/landing-page/LandingPage"));
const HomePage = lazy(() => import("../../pages/home/HomePage"));
const ProfilePage = lazy(() => import("../../pages/profile/ProfilePage"));
const CommunityPage = lazy(() => import("../../pages/community/CommunityPage"));
const CategoryPage = lazy(() => import("../../pages/category/CategoryPage"));

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        element: <PageTransition />,
        children: [
          {
            element: <GuestRoute />,
            children: [
              { path: "/", Component: LandingPage },
              { path: "login", Component: LoginPage },
              { path: "signup", Component: SignupPage },
              { path: "forgot-password", Component: ForgotPasswordPage },
            ],
          },
          {
            element: <ProtectedRoutes />,
            children: [
              { path: "/home", Component: HomePage },
              { path: "/profile", Component: ProfilePage },
              { path: "community", Component: CommunityPage },
              { path: "categories", Component: CategoryPage },
            ],
          },
        ],
      },
    ],
  },
];
