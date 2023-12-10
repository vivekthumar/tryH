import { Router } from 'express';
import AuthRoute from './components/auth/route';
import TaskRoute from './components/task/route';
import auth from './lib/auth';

const taskRoute = new TaskRoute();
const authRoute = new AuthRoute();

export default function registerRoutes(): Router {
	const router = Router();
  // Auth Open Routes 
  router.use('/auth', authRoute.routes());
  // Task Secure Routes
  router.use('/task', auth(), taskRoute.routes());

	return router;
}
