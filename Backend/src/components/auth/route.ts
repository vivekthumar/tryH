/* eslint-disable no-throw-literal */
import { Router } from 'express';
import joiValidate from '../../lib/validator';
import AuthController from './controller';
import { SignInSchema, SignUpSchema } from './schema';

const authController = new AuthController();

export default class AuthRoute {
    protected router: Router;

    constructor() {
        this.router = Router();
    }

    public routes(): Router {
        this.router.post('/signin', joiValidate(SignInSchema), authController.signIn);
        this.router.post('/signup', joiValidate(SignUpSchema), authController.signUp);
        
        return this.router;
    }
}
