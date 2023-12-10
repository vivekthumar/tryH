import AuthGuard from 'app/auth/AuthGuard';
import NotFound from 'app/views/public/NotFound';
import publicRoutes from 'app/views/public/Routes';
import taskRoutes from 'app/views/task/Routes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...taskRoutes],
  },
  ...publicRoutes,
  { path: '/', element: <Navigate to="task" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
