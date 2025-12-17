import { useEffect, type ReactNode } from "react";
import { useSession } from "../context/SessionContext";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { fullUserData } = useSession();

  useEffect(() => {
    if (fullUserData?.theme) {
      const isDark = fullUserData.theme === "dark";
      document.documentElement.setAttribute("data-theme", fullUserData.theme);

      if (isDark) {
        document.documentElement.style.setProperty("--shade-100", "#1c0f0d");
        document.documentElement.style.setProperty("--shade-200", "#ffc6c9");
        document.documentElement.style.setProperty("--shade-300", "#fd5d69");
        document.documentElement.style.setProperty("--shade-400", "#ec888d");
        document.documentElement.style.setProperty("--shade-900", "#fffdf9");
        document.documentElement.style.setProperty("--shade-950", "#ffffff");
      } else {
        document.documentElement.style.setProperty("--shade-100", "#fffdf9");
        document.documentElement.style.setProperty("--shade-200", "#ffc6c9");
        document.documentElement.style.setProperty("--shade-300", "#ec888d");
        document.documentElement.style.setProperty("--shade-400", "#fd5d69");
        document.documentElement.style.setProperty("--shade-900", "#3e2823");
        document.documentElement.style.setProperty("--shade-950", "#1c0f0d");
      }
    }
  }, [fullUserData?.theme]);

  return <>{children}</>;
};

export default ThemeProvider;
