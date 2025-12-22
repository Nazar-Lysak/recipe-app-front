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
const CategoryRecipesPage = lazy(
  () => import("../../pages/category-recipes/CategoryRecipesPage"),
);
const RecipePage = lazy(() => import("../../pages/recipe/RecipePage"));
const UserProfilePage = lazy(
  () => import("../../pages/user-profile/UserProfile"),
);
const CreateRecipePage = lazy(
  () => import("../../pages/create-recipe/CreateRecipePage"),
);
const NotificationPage = lazy(
  () => import("../../pages/notification/NotificationPage"),
);
const NotificationSettingsPage = lazy(
  () => import("../../pages/notification-settings/NotificationSettings"),
);
const HelpCenter = lazy(() => import("../../pages/help-center/HelpCenter"));
const PrivacyPolicy = lazy(
  () => import("../../pages/privacy-policy/PrivacyPolicy"),
);
const ThemePage = lazy(() => import("../../pages/theme/ThemePage"));
const LanguageSettings = lazy(
  () => import("../../pages/language-settings/LanguageSettings"),
);
const EditProfile = lazy(() => import("../../pages/edit-profile/EditProfile"));
const ChangePasswordPage = lazy(
  () => import("../../pages/change-password/ChangePasswordPage"),
);
const RestorePasswordPage = lazy(
  () => import("../../pages/auth/RestorePasswordPage"),
);
const SearchPage = lazy(() => import("../../pages/search/SearchPage"));
const RecipeReviewPage = lazy(
  () => import("../../pages/recipe-review/RecipeReview"),
);

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
              { path: "restore-password", Component: RestorePasswordPage },
            ],
          },
          {
            element: <ProtectedRoutes />,
            children: [
              { path: "/home", Component: HomePage },
              {
                path: "/profile",
                Component: ProfilePage,
              },
              {
                path: "edit-profile",
                Component: EditProfile,
              },
              {
                path: "edit-password",
                Component: ChangePasswordPage,
              },
              {
                path: "notification-settings",
                Component: NotificationSettingsPage,
              },
              { path: "help-center", Component: HelpCenter },
              { path: "privacy-policy", Component: PrivacyPolicy },
              { path: "theme-settings", Component: ThemePage },
              { path: "language-selection", Component: LanguageSettings },
              { path: "community", Component: CommunityPage },
              { path: "categories", Component: CategoryPage },
              {
                path: "categories/:categoryId",
                Component: CategoryRecipesPage,
              },
              {
                path: "recipe/:recipeId",
                Component: RecipePage,
              },
              {
                path: "recipe-review/:recipeId",
                Component: RecipeReviewPage,
              },
              {
                path: "user/:userId",
                Component: UserProfilePage,
              },
              {
                path: "create-recipe",
                Component: CreateRecipePage,
              },
              {
                path: "notifications",
                Component: NotificationPage,
              },
              {
                path: "search",
                Component: SearchPage
              }
            ],
          },
        ],
      },
    ],
  },
];
