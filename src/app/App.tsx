import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "../context/SessionContext";
import ThemeProvider from "./ThemeProvider";

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <AnimatePresence mode="wait">
      <SessionProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </SessionProvider>
    </AnimatePresence>
  );
};

export default App;
