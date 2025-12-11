import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const router = createBrowserRouter(routes);
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default App;