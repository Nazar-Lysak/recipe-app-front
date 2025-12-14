import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { type FC } from "react";
import BottomNavigation from "../bottom-navigation/BottomNavigation";
import Header from "../headers/header/Header";
import style from "./RootLayout.module.scss";
import { useSession } from "../../../context/SessionContext";
import PagePrealoader from "../../ui/page-prealoader/PagePrealoader";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const RootLayout: FC = () => {
  const { isLoading, loggedIn } = useSession();
  const mainClassName = loggedIn ? style.wrapperAuthenticated : style.wrapper;
  useScrollToTop();

  if (isLoading) {
    return (
      <AnimatePresence>
        <PagePrealoader />
      </AnimatePresence>
    );
  }

  return (
    <>
      {loggedIn && <Header />}
      <main className={mainClassName}>
        <Outlet />
      </main>
      {loggedIn && <BottomNavigation />}
    </>
  );
};

export default RootLayout;
