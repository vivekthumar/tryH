import { NextFunction, Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import Environment from '../environments/environment';

const env: Environment = new Environment();

const auth = () => {
  async function validate(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    try {
        await jwt.verify(authorizationHeader, env.JWT_SECRET);
        return next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Invalid token' });
    }
  }

  return validate;
};


export default auth;

