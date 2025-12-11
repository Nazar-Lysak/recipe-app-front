import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import PageTransition from '../../shared/components/page-transition/PageTransition'; 

const LoginPage = lazy(() => import('../../pages/auth/LoginPage'));
const SignupPage = lazy(() => import('../../pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../../pages/auth/ForgotPasswordPage'));

export const routes: RouteObject[] = [
  {
    element: <PageTransition />,
    children: [
      { path: 'login', Component: LoginPage },
      { path: 'signup', Component: SignupPage },
      { path: 'forgot-password', Component: ForgotPasswordPage },
    ],
  },
];