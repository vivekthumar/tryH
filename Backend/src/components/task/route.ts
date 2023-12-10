import { Router } from 'express';
import joiValidate from '../../lib/validator';
import { CreateSchema, UpdateSchema } from './schema';
import TaskController from "./controller";

const taskController = new TaskController();

export default class TaskRoute {
    protected router: Router;

    constructor() {
        this.router = Router();
    }

    public routes(): Router {
        this.router.post('/', joiValidate(CreateSchema), taskController.create);
        this.router.get('/', taskController.get);
        this.router.patch('/:id', joiValidate(UpdateSchema), taskController.update);
        this.router.delete('/:id', taskController.delete);
        
        return this.router;
    }
}
