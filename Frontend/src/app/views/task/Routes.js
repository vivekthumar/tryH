import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Task = Loadable(lazy(() => import('./index')));
const CmsLogbookForm = Loadable(lazy(() => import('./Form'))); 

const taskRoutes = [
  { path: '/task/', element: <Task /> },
  { path: '/task/:id', element: <CmsLogbookForm /> },
];

export default taskRoutes;
