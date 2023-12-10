import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const Login = Loadable(lazy(() => import('./Login')));
const SignUp = Loadable(lazy(() => import('./SignUp')));


const publicRoutes = [
  { path: '/signin', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/404', element: <NotFound /> },
];

export default publicRoutes;
