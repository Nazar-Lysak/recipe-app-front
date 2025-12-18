import { useEffect, type ReactNode } from "react";
import { useSession } from "../context/useSession";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { fullUserData } = useSession();

  useEffect(() => {
    if (fullUserData?.theme) {
      const theme = fullUserData.theme;
      document.documentElement.setAttribute("data-theme", theme);

      if (theme === "dark") {
        document.documentElement.style.setProperty("--shade-100", "#1c0f0d");
        document.documentElement.style.setProperty("--shade-200", "#ffc6c9");
        document.documentElement.style.setProperty("--shade-300", "#fd5d69");
        document.documentElement.style.setProperty("--shade-400", "#ec888d");
        document.documentElement.style.setProperty("--shade-900", "#fffdf9");
        document.documentElement.style.setProperty("--shade-950", "#ffffff");
      } else if (theme === "ocean") {
        document.documentElement.style.setProperty("--shade-100", "#0a1628");
        document.documentElement.style.setProperty("--shade-200", "#7dd3fc");
        document.documentElement.style.setProperty("--shade-300", "#38bdf8");
        document.documentElement.style.setProperty("--shade-400", "#0ea5e9");
        document.documentElement.style.setProperty("--shade-900", "#f0f9ff");
        document.documentElement.style.setProperty("--shade-950", "#ffffff");
      } else if (theme === "sunset") {
        document.documentElement.style.setProperty("--shade-100", "#1a0a2e");
        document.documentElement.style.setProperty("--shade-200", "#fbbf24");
        document.documentElement.style.setProperty("--shade-300", "#f97316");
        document.documentElement.style.setProperty("--shade-400", "#dc2626");
        document.documentElement.style.setProperty("--shade-900", "#fef3c7");
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
