/* eslint-disable no-throw-literal */
import { Request, Response } from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import Environment from '../../environments/environment'
;
import User from '../users/model';
import { IUser } from '../users/types';
import { AuthResponse } from './types';

const env: Environment = new Environment();

export default class AuthController {

  constructor() {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  generateToken(userId) {
    const payload = {
      data: userId,
    };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.EXPIRES_IN });
  };

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.isPasswordMatch(password))) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'Incorrect email or password',
        });
      }
      const token = this.generateToken(user._id);
      const response: AuthResponse = {
        message: 'User login successfully',
        token,
        user
      };
      return res.status(StatusCodes.OK).send(response);
    } catch (err) {      
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Internal Error.',
      });
		}
  }

  async signUp(req: Request, res: Response) {
    try {
      if (await User.isEmailTaken(req.body.email)) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'Email already taken',
        });
      }
      const userJson: IUser = await User.create(req.body);
      const response: AuthResponse = {
        message: 'User signup successfully',
        user: userJson
      };
      return res.status(StatusCodes.OK).send(response);
    } catch (err) {      
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Internal Error.',
      });
		}
  }

}
