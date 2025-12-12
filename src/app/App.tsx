import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "../context/SessionContext";

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <AnimatePresence mode="wait">
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </AnimatePresence>
  );
};

export default App;
